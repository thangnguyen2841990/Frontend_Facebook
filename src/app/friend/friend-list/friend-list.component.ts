import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../service/user-info/user-info.service';
import {UserInfo} from '../../model/user-info';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {FriendService} from '../../service/friend/friend.service';
import {NotificationAddFriend} from '../../model/notification-add-friend';
import {NotificationService} from '../../service/notification/notification.service';
import {NotificationAddFriendService} from '../../service/notificationAddFriend/notification-add-friend.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  listFriendId: number[] = [];
  listNotificationId: number[] = [];
  currentUserId: number;
  users: UserInfo[] = [];
  notificationAddFriend: NotificationAddFriend = {};
  notificationAddFriends: NotificationAddFriend[] = [];
  enableAdd = true;
  enalbleCancle = false;
  totalFriends: number;

  constructor(private userInfoService: UserInfoService,
              private authenticationService: AuthenticationService,
              private friendService: FriendService,
              private notificationService: NotificationService,
              private notificationAddFriendService: NotificationAddFriendService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.showAllNotificationAddFriend();


  }

  ngOnInit() {
    this.getAllFriendOfUser();
    this.showListFriend();
  }

  getAllFriendOfUser() {
    this.friendService.getAllFriends(this.currentUserId).subscribe((friends) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < friends.length; i++) {
        this.listFriendId.push(friends[i].friendsOfUserinfo.id);
        console.log(this.listFriendId[i]);
      }
    });
  }

  showListFriend() {
    this.userInfoService.getAllUserInfo(this.currentUserId).subscribe((usersBE) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < usersBE.length; i++) {
        if (this.listFriendId.includes(usersBE[i].id) === false) {
          this.users.push(usersBE[i]);
        }
      }
      this.totalFriends = usersBE.length;
    });
  }

  addFriend(fromId: number, toId: number) {
    this.friendService.addFriend(fromId, toId, this.notificationAddFriend).subscribe(() => {
      this.notificationService.showMessage('success', 'Bạn đã gửi lời kết bạn thành công!');
      this.showAllNotificationAddFriend();
    }, error => {
      this.notificationService.showMessage('error', 'bạn đã gửi lời kết bạn cho người này rôi!');
    });
  }

  deleteAddFriend(fromId: number, toId: number) {
    this.friendService.cancleAddFriend(fromId, toId).subscribe((res) => {
      console.log(`Received Response from cancel: ${res}`);
      this.showAllNotificationAddFriend();
      // tslint:disable-next-line:no-unused-expression
      this.notificationService.showMessage('success', 'Bạn đã hủy lời mời kết bạn thành công!');
    }, error => {
      this.notificationService.showMessage('error', 'Hủy không thành công!');
    });
  }

  showAllNotificationAddFriend() {
    this.notificationAddFriendService.getAllSendNotificationAddFriend(this.currentUserId).subscribe((notificationAddFriendsBE) => {
      console.log(`Received Response from cancel: ${notificationAddFriendsBE}`);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < notificationAddFriendsBE.length; i++) {
        this.listNotificationId.push(notificationAddFriendsBE[i].toUser.id);
        console.log('rrrrr' + notificationAddFriendsBE[i].toUser.id);
      }
      this.enalbleCancle = this.listNotificationId.includes(this.currentUserId);
      this.enableAdd = !this.enalbleCancle;
    });
  }


}
