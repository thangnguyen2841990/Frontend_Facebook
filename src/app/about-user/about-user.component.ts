import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PostService} from '../service/post/post.service';
import {UserInfoService} from '../service/user-info/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../model/post';
import {CommentService} from '../service/comment/comment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/auth/authentication.service';
import {LikePostService} from '../service/like-post/like-post.service';
import {LikePost} from '../model/like-post';
import {LikeCommentService} from '../service/like-comment/like-comment.service';
import {ImageService} from '../service/image/image.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MessagerService} from '../service/messager/messager.service';
import {NotificationService} from '../service/notification/notification.service';
import {Messager} from '../model/messager';
import {FriendService} from '../service/friend/friend.service';
import {Friend} from '../model/friend';
import {Chat} from '../model/chat';
import {Reply} from '../model/reply';
import {ReplyCommentService} from '../service/reply/reply-comment.service';


@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit {
  id: number;
  post: Post[] = [];
  currentUserId: number;
  userInfoForm: FormGroup;
  userInfoForm1: FormGroup;
  comment: FormGroup = new FormGroup({
    content: new FormControl(''),
  });
  fullName: string;
  avatar: any;
  backGroung: any;
  like: LikePost;
  isShowComment = false;
  image: FormGroup;
  imageUrl: any;
  imageId: number;
  modalRef: BsModalRef;
  toId: number;
  messagerForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });
  messagers: Messager[] = [];
  toUserFullName: any;
  toUserAvatar: any;
  friends: Friend[] = [];
  listFriend: any[] = [];
  chats: Chat[] = [];
  totalChat: number;
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });
  listReply: Reply[] = [];
   currentAvatar: any;
   cmId: number;
   commentEdit: FormGroup;
   replyEdit: FormGroup;
   repId: number;
  constructor(private postService: PostService,
              private userService: UserInfoService,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private authenticationService: AuthenticationService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private imageService: ImageService,
              private modalService: BsModalService,
              private messagerService: MessagerService,
              private notificationService: NotificationService,
              private friendService: FriendService,
              private router: Router,
              private replyService: ReplyCommentService,
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
    });

    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findUserInfoByUserId(this.id);
    this.findInfoCurrenUserId(this.currentUserId);

  }
  findInfoCurrenUserId(id: number) {
    this.userService.getUserInfoByUserId(id).subscribe(userInfo => {
      this.userInfoForm1 = new FormGroup({
        id: new FormControl(userInfo.id),
        email: new FormControl(userInfo.email),
        fullName: new FormControl(userInfo.fullName),
        phoneNumber: new FormControl(userInfo.phoneNumber),
        dateOfBirth: new FormControl(userInfo.dateOfBirth),
        address: new FormControl(userInfo.address),
        avatar: new FormControl(userInfo.avatar),
        backGround: new FormControl(userInfo.backGround),
        userId: new FormControl(userInfo.user.id),
      });
      this.currentAvatar = this.userInfoForm1.value.avatar;
    });
  }
  findUserInfoByUserId(id: number) {
    this.userService.getUserInfoByUserId(this.id).subscribe(userInfo => {
      this.userInfoForm = new FormGroup({
        id: new FormControl(userInfo.id),
        email: new FormControl(userInfo.email),
        fullName: new FormControl(userInfo.fullName),
        phoneNumber: new FormControl(userInfo.phoneNumber),
        dateOfBirth: new FormControl(userInfo.dateOfBirth),
        address: new FormControl(userInfo.address),
        avatar: new FormControl(userInfo.avatar),
        backGround: new FormControl(userInfo.backGround),
        userId: new FormControl(userInfo.user.id),
      });
      this.fullName = this.userInfoForm.value.fullName;
      this.avatar = this.userInfoForm.value.avatar;
      this.backGroung = this.userInfoForm.value.backGround;
      this.toId = this.userInfoForm.value.userId;
    });
  }

  ngOnInit() {
    this.getAllPostOfUser();
    this.getAllMessagers();
    this.getAllFriendOfUser();
    this.getAllChat();
  }

  getAllPostOfUser() {
    return this.postService.getAllPostOfUser(this.id).subscribe(posts => {
      this.post = posts;
    });
  }

  createComment(userId: number, postId: number) {
    this.commentService.save(userId, postId, this.comment.value).subscribe(() => {
      this.comment.reset();
      this.getAllPostOfUser();
    });
  }

  likePost(userId: number, postId: number) {
    this.likePostService.save(userId, postId, this.like).subscribe(() => {
      this.getAllPostOfUser();
    });
  }

  likeComment(id: number, currentUserId: number) {
    this.likeCommentService.save(id, currentUserId, this.like).subscribe(() => {
      this.getAllPostOfUser();
    });
  }

  showComment() {
    this.isShowComment = !this.isShowComment;
  }

  openModalShowImage(templateImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.imageId = imageId;
    this.getImageById(imageId);
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

  createMessager() {
    this.messagerService.createMessager(this.currentUserId, this.toId, this.messagerForm.value).subscribe(() => {
      this.messagerForm.reset();
      this.getAllMessagers();
      this.getAllChat();
    });
  }

  getAllMessagers() {
    this.messagerService.getMessagers(this.currentUserId, this.toId).subscribe(messagers => {
      this.messagers = messagers;
    });
  }


  openModalMessager(templateMessager: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateMessager,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.getAllMessagers();
  }

  getAllFriendOfUser() {
    return this.friendService.getAllFriends(this.currentUserId).subscribe(friends => {
      this.friends = friends;
      for (let i = 0; i < friends.length; i++) {
        this.listFriend.push(friends[i].friendsOfUserinfo.id);
        console.log('id của bạn của post' + this.listFriend[i]);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  getAllChat() {
    this.messagerService.getChats(this.currentUserId).subscribe(chats => {
      this.chats = chats;
      this.totalChat = chats.length;
    });
  }
  createReply(userId, cmId, postId, reply) {
    if (this.replyForm.valid) {
      this.replyService.createReply(userId, cmId, postId, reply).subscribe(() => {
        this.getAllPostOfUser();
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
      this.getAllPostOfUser();
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
        this.getAllPostOfUser();
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
        this.getAllPostOfUser();
      });
    }
  }


  deleteReply() {
    this.replyService.deleteReply(this.repId).subscribe(() => {
      this.getAllPostOfUser();
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
}
