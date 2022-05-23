import {Component, OnInit} from '@angular/core';
import {Group} from '../../model/group';
import {GroupService} from '../../service/group/group.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {NotificationAddGroup} from '../../model/notification-add-group';
import {NotificationAddGroupService} from '../../service/notificationAddGroup/notification-add-group.service';

@Component({
  selector: 'app-group-other',
  templateUrl: './group-other.component.html',
  styleUrls: ['./group-other.component.css']
})
export class GroupOtherComponent implements OnInit {
  currentUserId: number;
  groups: Group[] = [];
  notification: NotificationAddGroup;
  groupIdNoti: number[] = [];

  constructor(private groupService: GroupService,
              private authenticationService: AuthenticationService,
              private notificationAddGroupService: NotificationAddGroupService,
              private notificationService: NotificationService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.showAllNotiFormUser();
  }

  ngOnInit() {
    this.getAll();
  }

  showAllNotiFormUser() {
    this.notificationAddGroupService.getAllNotiFromUSer(this.currentUserId).subscribe(noti => {
      for (let i = 0; i < noti.length; i++) {
        this.groupIdNoti.push(noti[i].group.id);
      }
    });
  }
  getAll() {
    this.groupService.getAllGroupOtherUserId(this.currentUserId).subscribe((groupOther) => {
      this.groups = groupOther.content;
    });
  }
  createNotificationAddGroup(fromUserId, toUserId, groupUserId, notification) {
    this.notificationAddGroupService.createNotificationAddGroup(fromUserId, toUserId, groupUserId, notification).subscribe(() => {
      this.notificationService.showMessage('success', 'Xin tham gia nhóm thành công!');
      this.showAllNotiFormUser();

    }, error => {
      this.notificationService.showMessage('error', 'Tham gia không thành công!');
    });
  }
}
