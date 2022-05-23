import {Component, OnInit, TemplateRef} from '@angular/core';
import {Post} from '../../model/post';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LikePost} from '../../model/like-post';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Messager} from '../../model/messager';
import {Friend} from '../../model/friend';
import {Chat} from '../../model/chat';
import {PostService} from '../../service/post/post.service';
import {UserInfoService} from '../../service/user-info/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../service/comment/comment.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {LikePostService} from '../../service/like-post/like-post.service';
import {LikeCommentService} from '../../service/like-comment/like-comment.service';
import {ImageService} from '../../service/image/image.service';
import {MessagerService} from '../../service/messager/messager.service';
import {NotificationService} from '../../service/notification/notification.service';
import {FriendService} from '../../service/friend/friend.service';
import {UserInfo} from '../../model/user-info';

@Component({
  selector: 'app-mutual-friend',
  templateUrl: './mutual-friend.component.html',
  styleUrls: ['./mutual-friend.component.css']
})
export class MutualFriendComponent implements OnInit {

  id: number;
  post: Post[] = [];
  currentUserId: number;
  userInfoForm: FormGroup;
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
  mutualFriends: UserInfo[] = [];
  toIdFriend: number;
  chats: Chat[] = [];
  totalChat: number;

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
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
    });
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findUserInfoByUserId(this.id);
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
      console.log('id' + this.toId);
      this.getAllFriendOfUser();
      this.getAllFriendOfToUser(id);

    });
  }

  ngOnInit() {
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


  getAllFriendOfUser() {
    return this.friendService.getAllFriends(this.currentUserId).subscribe(friends => {
      this.friends = friends;
      for (let i = 0; i < friends.length; i++) {
        this.listFriend.push(friends[i].friendsOfUserinfo.id);
        console.log('id của bạn của post' + this.listFriend[i]);
      }
    });
  }

  getAllFriendOfToUser(id) {
    return this.friendService.getAllFriends(id).subscribe((friends) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < friends.length; i++) {
        if (this.listFriend.includes(friends[i].friendsOfUserinfo.id)) {
          this.mutualFriends.push(friends[i].friendsOfUserinfo);
          console.log(this.mutualFriends[i]);
        }
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }



}
