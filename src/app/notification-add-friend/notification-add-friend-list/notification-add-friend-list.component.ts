import {Component, OnInit, TemplateRef} from '@angular/core';
import {NotificationAddFriend} from '../../model/notification-add-friend';
import {NotificationAddFriendService} from '../../service/notificationAddFriend/notification-add-friend.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {FriendService} from '../../service/friend/friend.service';
import {NotificationService} from '../../service/notification/notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-notification-add-friend-list',
  templateUrl: './notification-add-friend-list.component.html',
  styleUrls: ['./notification-add-friend-list.component.css']
})
export class NotificationAddFriendListComponent implements OnInit {
  modalRef: BsModalRef;
  notificationAddFriend: NotificationAddFriend = {};
  toUserId: number;
  notificationAddFriends: NotificationAddFriend[] = [];
  notificationId: number;

  constructor(private notificationAddFriendService: NotificationAddFriendService,
              private authenticationService: AuthenticationService,
              private friendService: FriendService,
              private notificationService: NotificationService,
              private modalService: BsModalService) {
    this.toUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllNotificationAddFriend();
  }

  getAllNotificationAddFriend() {
    this.notificationAddFriendService.getAllNotificationAddFriend(this.toUserId).subscribe((notificationAddFriendsBE) => {
      this.notificationAddFriends = notificationAddFriendsBE;
    });
  }

  acceptFriend(fromId: number, toUserId: number) {
    this.friendService.acceptFriend(fromId, toUserId, this.notificationAddFriend).subscribe(() => {
      this.notificationService.showMessage('success', 'kết bạn thành công');
      this.getAllNotificationAddFriend();
    }, error => {
      this.notificationService.showMessage('error', 'kết bạn lỗi');
    });

  }

  openModalDeleteNotification(templateDeleteNotification: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteNotification,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.notificationId = id;
  }

  deleteNotification() {
    this.friendService.deleteAddFriend(this.notificationId).subscribe(() => {
      this.notificationService.showMessage('success', 'đã từ chối');
      this.getAllNotificationAddFriend();
      this.modalRef.hide();
    }, error => {
      this.notificationService.showMessage('error', 'từ chối lỗi');
    });
  }
}

