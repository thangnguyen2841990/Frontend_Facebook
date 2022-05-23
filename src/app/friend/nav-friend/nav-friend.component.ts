import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../model/status';
import {LikePost} from '../../model/like-post';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Friend} from '../../model/friend';
import {Message} from '../../model/message';
import {UserInfo} from '../../model/user-info';
import {Messager} from '../../model/messager';
import {Chat} from '../../model/chat';
import {Post} from '../../model/post';
import {UserInfoService} from '../../service/user-info/user-info.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {PostService} from '../../service/post/post.service';
import {Router} from '@angular/router';
import {StatusService} from '../../service/status-post/status.service';
import {LikePostService} from '../../service/like-post/like-post.service';
import {CommentService} from '../../service/comment/comment.service';
import {FriendService} from '../../service/friend/friend.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {ImageService} from '../../service/image/image.service';
import {MessageService} from '../../service/message-notifi/message.service';
import {NotificationService} from '../../service/notification/notification.service';
import {MessagerService} from '../../service/messager/messager.service';

@Component({
  selector: 'app-nav-friend',
  templateUrl: './nav-friend.component.html',
  styleUrls: ['./nav-friend.component.css']
})
export class NavFriendComponent implements OnInit {

  posts: Post[] = [];
  userInfoForm: FormGroup;
  currentUserId: number;
  fullName: string;
  avatar: string;
  selectedFile: File[] = [];
  statusList: Status[] = [];
  postForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required]),
    statusId: new FormControl('', [Validators.required]),
    status: new FormControl('')
  });
  like: LikePost;
  comment: FormGroup = new FormGroup({
    content: new FormControl(''),
  });
  modalRef: BsModalRef;
  friends: Friend[] = [];
  isShowComment = false;
  imageUrl: string;
  imageId: number;
  image: FormGroup;

  messages: Message[] = [];
  totalMessage: number;
  isSetting = false;
  listFriend: any[] = [];
  users: UserInfo[] = [];
  messagers: Messager[] = [];
  chats: Chat[] = [];
  totalChat: number;
  theLastContent: any;
  toId?: number;
  messagerForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  toUserAvatar: any;
  toUserFullName: any;
  messageID: number;

  constructor(private userInfoService: UserInfoService,
              private authenticationService: AuthenticationService,
              private postService: PostService,
              private router: Router,
              private statusService: StatusService,
              private likePostService: LikePostService,
              private commentService: CommentService,
              private modalService: BsModalService,
              private friendService: FriendService,
              private likeCommentService: LikeCommentService,
              private imageService: ImageService,
              private messageService: MessageService,
              private notificationService: NotificationService,
              private messagerService: MessagerService
  ) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findUserInfoByUserId(this.currentUserId);
    this.getImageById(this.imageId);
    this.getAllMessage();
    this.getAllFriendOfUser();
  }

  ngOnInit() {
    this.getAllPostOfFriend();
    this.getAllStatus();
    this.getAllFriendOfUser();
    this.getTotalMessage();
    this.showAllUserInfo();
    this.getAllMessagerOfUser();
    this.getAllChat();
    this.getAllMessagers();
  }

  findUserInfoByUserId(id: number) {
    this.userInfoService.getUserInfoByUserId(this.currentUserId).subscribe(userInfo => {
      this.userInfoForm = new FormGroup({
        id: new FormControl(userInfo.id),
        email: new FormControl(userInfo.email),
        fullName: new FormControl(userInfo.fullName),
        phoneNumber: new FormControl(userInfo.phoneNumber),
        dateOfBirth: new FormControl(userInfo.dateOfBirth),
        address: new FormControl(userInfo.address),
        avatar: new FormControl(userInfo.avatar),
        backGround: new FormControl(userInfo.backGround)
      });
      this.fullName = this.userInfoForm.value.fullName;
      this.avatar = this.userInfoForm.value.avatar;
    });
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changePassword() {
    this.router.navigate(['/changePassword']);
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);
  }

  savePost() {
    if (this.postForm.valid) {
      const status = this.postForm.value;
      this.postForm.patchValue({
        status: {
          id: status.statusId,
          name: ''
        }
      });
      const formData = new FormData();
      console.log(this.postForm.value);
      formData.append('content', this.postForm.value.content);
      formData.append('status', this.postForm.value.status.id);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('image', this.selectedFile[i]);
      }
      console.log(this.currentUserId);
      console.log(formData);
      this.postService.savePost(this.currentUserId, formData).subscribe(() => {
        this.postForm.reset();
        this.notificationService.showMessage('success', 'Thêm mới bài đăng thành công!');
        this.modalRef.hide();
        this.router.navigate(['/about']);
      }, error => {
        this.notificationService.showMessage('error', 'Thêm mới bài đăng lỗi!');

      });
    } else {
      this.notificationService.showMessage('error', 'Bạn chưa nhập đủ thông tin!');

    }

  }

  getAllPostOfFriend() {
    this.postService.getAllPostOfFriends(this.currentUserId).subscribe(posts => {
      for (let i = 0; i < posts.length; i++) {
        if (this.listFriend.includes(posts[i].userInfo.id)) {
          this.posts[i] = (posts[i]);
        }
      }
    });
  }

  getAllStatus() {
    return this.statusService.getAll().subscribe(status => {
      this.statusList = status;
      console.log(this.statusList);
    });
  }

  createComment(userId: number, postId: number) {
    this.commentService.save(userId, postId, this.comment.value).subscribe(() => {
      this.comment.reset();
      this.getAllPostOfFriend();
    });
  }

  likePost(userId: number, postId: number) {
    this.likePostService.save(userId, postId, this.like).subscribe(() => {
      this.getAllPostOfFriend();
    });
  }


  getImageById(id: number) {
    this.imageService.getImageById(id).subscribe(image => {
      this.image = new FormGroup({
        id: new FormControl(image.id),
        image: new FormControl(image.image),
      });
      this.imageUrl = this.image.value.image;
      console.log(this.imageUrl);
    });
  }

  openModalCreate(templateCreate: TemplateRef<any>, currentUserId: number) {
    this.modalRef = this.modalService.show(
      templateCreate,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  openModalShowImage(templateImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.imageId = imageId;
    this.getImageById(imageId);
  }

  getAllFriendOfUser() {
    return this.friendService.getAllFriends(this.currentUserId).subscribe(friends => {
      this.friends = friends;
      for (let i = 0; i < friends.length; i++) {
        this.listFriend.push(friends[i].friendsOfUserinfo.id);
        console.log('id của bạn' + this.listFriend[i]);
      }
    });
  }

  likeComment(id: number, currentUserId: number) {
    this.likeCommentService.save(id, currentUserId, this.like).subscribe(() => {
      this.getAllPostOfFriend();
    });
  }

  showComment() {
    this.isShowComment = !this.isShowComment;
  }

  getAllMessage() {
    this.messageService.getAll(this.currentUserId).subscribe(messages => {
      this.messages = messages;
    });
  }

  getTotalMessage() {
    this.messageService.getTotalMessage(this.currentUserId).subscribe(total => {
      this.totalMessage = total;
    });
  }

  openUserSetting() {
    this.isSetting = !this.isSetting;
  }

  showAllUserInfo() {
    this.userInfoService.getAllUserInfo(this.currentUserId).subscribe(users => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < users.length; i++) {
        if (this.listFriend.includes(users[i].id) === false) {
          this.users.push(users[i]);
        }
      }
    });
  }

  getAllMessagerOfUser() {
    this.messagerService.getMessagersOfUser(this.currentUserId).subscribe(messgers => {
      this.messagers = messgers;
    });
  }

  getAllChat() {
    this.messagerService.getChats(this.currentUserId).subscribe(chats => {
      this.chats = chats;
      this.totalChat = chats.length;
    });
  }

  openModalMessager(templateMessager: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateMessager,
      Object.assign({}, {class: 'gray modal-sm '})
    );
    this.toId = id;
    this.findById(id);
    this.getAllMessagers();
  }

  getAllMessagers() {
    this.messagerService.getMessagers(this.currentUserId, this.toId).subscribe(messagers => {
      this.messagers = messagers;
    });
  }

  createMessager() {
    this.messagerService.createMessager(this.currentUserId, this.toId, this.messagerForm.value).subscribe(() => {
      this.messagerForm.reset();
      this.getAllMessagers();
      this.getAllChat();
    });
  }

  findById(id) {
    this.userInfoService.getUserInfoByUserId(id).subscribe(user => {
      this.toUserAvatar = user.avatar;
      console.log(this.toUserAvatar);
      this.toUserFullName = user.fullName;
    });
  }

  moveRouter(status) {
    if (status === 0) {
      this.router.navigateByUrl('/addFriends/list');
    }
    if (status === 2) {
      this.router.navigateByUrl('/about');
    }
    if (status === 1) {
      this.router.navigateByUrl('/group/list/notificationAddGroup');
    }
  }

  deleteMessage(id) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.notificationService.showMessage('success', 'Xóa thành công!');
      this.modalRef.hide();
      this.getAllMessage();
      this.totalMessage = this.totalMessage - 1;
    }, error => {
      this.notificationService.showMessage('error', 'Xóa lỗi!');
    });
  }

  openModalDeleteMessage(templateDeleteMessage: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteMessage,
      Object.assign({}, {class: 'gray modal-lg '})
    );
    this.messageID = id;
    console.log('id thong bao' + this.messageID);
  }

}
