import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoService} from '../service/user-info/user-info.service';
import {AuthenticationService} from '../service/auth/authentication.service';
import {PostService} from '../service/post/post.service';
import {Router} from '@angular/router';
import {StatusService} from '../service/status-post/status.service';
import {Post} from '../model/post';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ImageService} from '../service/image/image.service';
import {Image} from '../model/image';
import {Status} from '../model/status';
import {CommentService} from '../service/comment/comment.service';
import {LikePostService} from '../service/like-post/like-post.service';
import {LikePost} from '../model/like-post';
import {LikeCommentService} from '../service/like-comment/like-comment.service';
import {NotificationService} from '../service/notification/notification.service';
import {ChangeAvatarService} from '../service/change-avatar-background/change-avatar.service';
import {Message} from '../model/message';
import {MessageService} from '../service/message-notifi/message.service';
import {ReplyCommentService} from '../service/reply/reply-comment.service';
import {ListReply} from '../model/list-reply';
import {Reply} from '../model/reply';
import {Comment} from '../model/comment';


declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  userInfoForm: FormGroup;
  currentUserId: number;
  fullName: string;
  avatar: string;
  backGroung: string;
  post: Post[] = [];
  modalRef: BsModalRef;
  postId: number;
  images: Image[] = [];
  totalImage: number;
  postForm: FormGroup;
  selectedFile: File[] = [];
  imageId: number;
  status: Status[] = [];
  comment: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });
  like: LikePost;
  totallikeCm: any[] = [];
  commentId: any[] = [];
  isShowComment = false;
  isShowDropdown = false;
  image: FormGroup;
  avatarFile: File;
  backGroundFile: File;
  messages: Message[] = [];
  totalMessage: number;
  avatarForm: FormGroup = new FormGroup({
    avatar: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  backgroundForm: FormGroup = new FormGroup({
    background: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });
  replyForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });
  commentEdit: FormGroup;


  listReply: Reply[] = [];
  imageUrl: any;
  cmId: number;
  replyEdit: FormGroup;
   repId: number;

  constructor(private userInfoService: UserInfoService,
              private authenticationService: AuthenticationService,
              private postService: PostService,
              private router: Router,
              private statusService: StatusService,
              private modalService: BsModalService,
              private imageService: ImageService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private likeCommentService: LikeCommentService,
              private notificationService: NotificationService,
              private changeAvatarService: ChangeAvatarService,
              private messageService: MessageService,
              private replyService: ReplyCommentService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findUserInfoByUserId(this.currentUserId);
    this.getAllMessage();

  }

  ngOnInit() {
    this.getAllPostByUser();
    this.getStatus();
    this.getTotalMessage();
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
      });
      this.fullName = this.userInfoForm.value.fullName;
      this.avatar = this.userInfoForm.value.avatar;
      this.backGroung = this.userInfoForm.value.backGround;
    });
  }

  getAllPostByUser() {
    return this.postService.getAllPostOfUser(this.currentUserId).subscribe(post => {
      this.post = post;
    });
  }

  openModalWithClass(templateDelete: TemplateRef<any>, postId: number) {
    this.modalRef = this.modalService.show(
      templateDelete,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.postId = postId;
    console.log(this.postId);
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.notificationService.showMessage('success', 'Xóa thành công!');
      this.modalRef.hide();
      this.getAllPostByUser();
    });
  }

  getAllImagesByPostId(id: number) {
    return this.imageService.getAllImagesByPostId(id).subscribe(images => {
      this.images = images;
    });
  }

  getPostByPostId(userid: number, postId: number) {
    return this.postService.getPostByPostId(userid, postId).subscribe(post => {
      this.postForm = new FormGroup({
        content: new FormControl(post.content),
        statusId: new FormControl(post.status.id),
        status: new FormControl(''),
        listImage: new FormControl(post.listImage)
      });
      this.images = this.postForm.value.listImage;
      console.log(this.images);
      console.log(this.postForm.value.content);
    });
  }

  updatePost() {
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
    if (this.selectedFile !== null) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFile.length; i++) {
        formData.append('image', this.selectedFile[i]);
      }
    }
    this.postService.update(this.currentUserId, this.postId, formData).subscribe(() => {
      this.notificationService.showMessage('success', 'Cập nhật bài đăng thành công!');
      this.modalRef.hide();
      this.getAllPostByUser();
      this.selectedFile = null;
    });


  }

  openModalEdit(templateEdit: TemplateRef<any>, postUserId: number) {
    this.modalRef = this.modalService.show(
      templateEdit,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.postId = postUserId;
    console.log(this.postId);
    this.getPostByPostId(this.currentUserId, this.postId);
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);
  }

  deleteImage(id: number) {
    this.imageService.deleteImage(id).subscribe(() => {
      this.notificationService.showMessage('success', 'Xóa ảnh thành công!');
      this.modalRef.hide();
      this.getPostByPostId(this.currentUserId, this.postId);
      this.getAllPostByUser();
    });
  }

  openModalDeleteImage(templateDeleteImage: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.imageId = id;
  }

  getStatus() {
    return this.statusService.getAll().subscribe(status => {
      this.status = status;
    });
  }

  createComment(userId: number, postId: number) {
    this.commentService.save(userId, postId, this.comment.value).subscribe(() => {
      this.getAllPostByUser();
      this.comment.reset();
    });
  }

  likePost(userId: number, postId: number) {
    this.likePostService.save(userId, postId, this.like).subscribe(() => {
      this.getAllPostByUser();
    });
  }

  likeComment(id: number, currentUserId: number) {
    this.likeCommentService.save(id, currentUserId, this.like).subscribe(() => {
      this.getAllPostByUser();
    });
  }

  totalLikeComment(id: number) {
    this.likeCommentService.totalLike(id).subscribe(total => {
      this.totallikeCm = total;
      console.log(this.totallikeCm);
    });
  }

  showComment() {
    this.isShowComment = !this.isShowComment;
  }

  showDropdown() {
    this.isShowDropdown = !this.isShowDropdown;
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

  changeAvatar($event) {
    this.avatarFile = $event.target.files[0];
  }

  changeBackground($event) {
    this.backGroundFile = $event.target.files[0];
  }

  editAvatar() {
    if (this.avatarForm.valid) {
      const formData = new FormData();
      formData.append('avatar', this.avatarFile);
      formData.append('status', this.avatarForm.value.status);
      this.changeAvatarService.editAvatar(this.currentUserId, formData).subscribe(userinfo => {
        this.avatar = userinfo.avatar;
        this.notificationService.showMessage('success', 'Thay đổi avatar thành công!');
        this.getAllPostByUser();
        this.modalRef.hide();
      }, error => {
        this.notificationService.showMessage('error', 'Thay đổi avatar thất bại!');
      });
    } else {
      this.notificationService.showMessage('error', 'Bạn chưa chọn ảnh!');
    }
  }

  editBackground() {
    if (this.backgroundForm.valid) {
      const formData = new FormData();
      formData.append('background', this.backGroundFile);
      formData.append('status', this.backgroundForm.value.status);
      this.changeAvatarService.editBackGround(this.currentUserId, formData).subscribe(userinfo => {
        this.backGroung = userinfo.backGround;
        this.notificationService.showMessage('success', 'Thay đổi ảnh nền thành công!');
        this.getAllPostByUser();
        this.modalRef.hide();
      }, error => {
        this.notificationService.showMessage('error', 'Thay đổi ảnh nền thất bại!');
      });
    } else {
      this.notificationService.showMessage('error', 'Bạn chưa chọn ảnh!');
    }
  }

  openModalChangeAvatar(templateChangeAvatar: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateChangeAvatar,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  openModalChangeBackground(templateChangeBackground: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      templateChangeBackground,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
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

  createReply(userId, cmId, postId, reply) {
    if (this.replyForm.valid) {
      this.replyService.createReply(userId, cmId, postId, reply).subscribe(() => {
        this.getAllPostByUser();
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
      this.getAllPostByUser();
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
        this.getAllPostByUser();
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
        this.getAllPostByUser();
      });
    }
  }


  deleteReply() {
    this.replyService.deleteReply(this.repId).subscribe(() => {
      this.getAllPostByUser();
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
