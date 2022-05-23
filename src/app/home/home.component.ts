import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserInfoService} from '../service/user-info/user-info.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/auth/authentication.service';
import {PostService} from '../service/post/post.service';
import {Post} from '../model/post';
import {Router} from '@angular/router';
import {StatusService} from '../service/status-post/status.service';
import {Status} from '../model/status';
import {LikePostService} from '../service/like-post/like-post.service';
import {LikePost} from '../model/like-post';
import {CommentService} from '../service/comment/comment.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FriendService} from '../service/friend/friend.service';
import {Friend} from '../model/friend';
import {LikeCommentService} from '../service/like-comment/like-comment.service';
import {ImageService} from '../service/image/image.service';
import {Image} from '../model/image';
import {MessageService} from '../service/message-notifi/message.service';
import {Message} from '../model/message';
import {NotificationService} from '../service/notification/notification.service';
import {UserInfo} from '../model/user-info';
import {MessagerService} from '../service/messager/messager.service';
import {Messager} from '../model/messager';
import {Chat} from '../model/chat';
import {Reply} from '../model/reply';
import {ReplyCommentService} from '../service/reply/reply-comment.service';
import {NotificationAddFriend} from '../model/notification-add-friend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  userInfoForm: FormGroup;
  currentUserId: number;
  fullName: string;
  avatar: string;
  selectedFile: File[] = [];
  statusList: Status[] = [];
  postForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
  submitted = false;
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });
  listReply: Reply[] = [];
  cmId: number;
  commentEdit: FormGroup;
  repId: number;
  replyEdit: FormGroup;
  notificationAddFriend: NotificationAddFriend;
  totalFriends: number;

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
              private messagerService: MessagerService,
              private replyService: ReplyCommentService
  ) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findUserInfoByUserId(this.currentUserId);
    this.getImageById(this.imageId);
    this.getAllFriendOfUser();
  }

  ngOnInit() {
    this.getAllStatus();
    this.getAllPostOfFriend();
    this.getTotalMessage();
    this.showAllUserInfo();
    this.getAllChat();


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
        backGround: new FormControl(userInfo.backGround),
        interest: new FormControl(userInfo.interest)
      });
      this.fullName = this.userInfoForm.value.fullName;
      this.avatar = this.userInfoForm.value.avatar;
    });
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);
  }

  getAllStatus() {
    return this.statusService.getAll().subscribe(status => {
      this.statusList = status;
      console.log(this.statusList);
    });
  }

  savePost() {
    this.submitted = true;
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
      if (this.selectedFile != null) {
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append('image', this.selectedFile[i]);
        }
      }
      console.log(this.currentUserId);
      console.log(formData);
      this.postService.savePost(this.currentUserId, formData).subscribe(() => {
        this.postForm.reset();
        this.modalRef.hide();
        this.router.navigateByUrl('/about')
      }, error => {
        this.notificationService.showMessage('error', 'Thêm mới bài đăng lỗi!');

      });
    } else {
      this.notificationService.showMessage('error', 'Bạn chưa nhập đủ thông tin!');

    }

  }

  getAllPostOfFriend() {
    this.postService.getAllPostOfFriends(this.currentUserId).subscribe(posts => {
      this.posts = posts;
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
    this.getAllStatus();

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
      this.totalFriends = friends.length;
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
      for (let i = 0; i < users.length; i++) {
        if (this.listFriend.includes(users[i].id) == false) {
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
      Object.assign({}, {class: 'gray modal-sm'})
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

  createReply(userId, cmId, postId, reply) {
    if (this.replyForm.valid) {
      this.replyService.createReply(userId, cmId, postId, reply).subscribe(() => {
        this.getAllPostOfFriend();
        this.replyForm.reset();
      }, error => {
        this.notificationService.showMessage('error', 'Phản hồi lỗi!');
      });
    }
  }

  openModalDeleteComment(templateDeleteComment: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteComment,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.cmId = id;
    console.log('idcm' + this.cmId);
  }

  deleteComment() {
    this.commentService.deleteComment(this.cmId).subscribe(() => {
      this.getAllPostOfFriend();
      this.modalRef.hide();
    });
  }

  openModalEditComment(templateEditComment: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateEditComment,
      Object.assign({}, {class: 'gray modal-sm'})
    );
    this.cmId = id;
    this.findCommentById(this.cmId);
    console.log('idcm' + this.cmId);
  }

  findCommentById(id) {
    this.commentService.findCommentByID(id).subscribe(comment => {
      this.commentEdit = new FormGroup({
        content: new FormControl(comment.content, Validators.required),
      });
    });
  }

  editComemnt() {
    if (this.commentEdit.valid) {
      this.commentService.updateComment(this.cmId, this.commentEdit.value).subscribe(() => {
        this.modalRef.hide();
        this.getAllPostOfFriend();
      });
    }
  }

  findReplyById(id) {
    this.replyService.getById(id).subscribe(reply => {
      this.replyEdit = new FormGroup({
        content: new FormControl(reply.content, Validators.required),
      });
    });
  }

  openModalEditReply(templateEditReply: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateEditReply,
      Object.assign({}, {class: 'gray modal-sm'})
    );
    this.repId = id;
    this.findReplyById(this.repId);
    console.log('idcm' + this.repId);
  }

  editReply() {
    if (this.replyEdit.valid) {
      this.replyService.editReply(this.repId, this.replyEdit.value).subscribe(() => {
        this.modalRef.hide();
        this.getAllPostOfFriend();
      });
    }
  }


  deleteReply() {
    this.replyService.deleteReply(this.repId).subscribe(() => {
      this.getAllPostOfFriend();
      this.modalRef.hide();
    });
  }

  openModalDeleteReply(templateDeleteReply: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteReply,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.repId = id;
    console.log('idcm' + this.cmId);
  }
  addFriend(fromId: number, toId: number) {
    this.friendService.addFriend(fromId, toId, this.notificationAddFriend).subscribe(() => {
      this.notificationService.showMessage('success', 'Bạn đã gửi lời kết bạn thành công!');
    }, error => {
      this.notificationService.showMessage('error', 'bạn đã gửi lời kết bạn cho người này rôi!');
    });
  }

}
