import {Component, OnInit, TemplateRef} from '@angular/core';
import {FriendService} from '../../service/friend/friend.service';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {ListFriend} from '../../model/list-friend';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-friend-list-of-me',
  templateUrl: './friend-list-of-me.component.html',
  styleUrls: ['./friend-list-of-me.component.css']
})
export class FriendListOfMeComponent implements OnInit {
  modalRef: BsModalRef;
  currentUserId: number;
  listFriend: ListFriend[] = [];
  toId: number;
  totalFriends: number;

  constructor(private friendService: FriendService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllFriends();
  }

  getAllFriends() {
    this.friendService.getAllFriends(this.currentUserId).subscribe((listFriends) => {
      this.listFriend = listFriends;
      this.totalFriends = listFriends.length;
    });
  }

  openModalUnfriend(templateUnfriend: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateUnfriend,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.toId = id;
  }

  unfriend() {
    this.friendService.unfriend(this.currentUserId, this.toId).subscribe(() => {
      this.notificationService.showMessage('success', 'Hủy kết bạn thành công');
      this.modalRef.hide();
      this.getAllFriends();
    }, error => {
      this.notificationService.showMessage('error', 'Hủy kết bạn lỗi');
    });
  }

}
