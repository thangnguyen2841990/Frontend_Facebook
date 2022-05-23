import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group} from '../../model/group';
import {NotificationAddGroup} from '../../model/notification-add-group';
import {NotificationAddGroupService} from '../../service/notificationAddGroup/notification-add-group.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {GroupMember} from '../../model/group-member';
import {GroupMemberService} from '../../service/groupMember/group-member.service';
import {NotificationService} from '../../service/notification/notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification-group-list',
  templateUrl: './notification-group-list.component.html',
  styleUrls: ['./notification-group-list.component.css']
})
export class NotificationGroupListComponent implements OnInit {
  groups: NotificationAddGroup[] = [];
  currenUserId: number;
  notificationAddGroup: NotificationAddGroup = {};
  groupMember: GroupMember;
  modalRef: BsModalRef;
  groupId: number;
  memberId: number;
  constructor(private notificationAddGroupService: NotificationAddGroupService,
              private authenticationService: AuthenticationService,
              private groupMemberService: GroupMemberService,
              private notification: NotificationService,
              private modalService: BsModalService) {
    this.currenUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllNotificationAddGroup();
  }

  getAllNotificationAddGroup() {
    this.notificationAddGroupService.getAllNotificationAddGroup(this.currenUserId).subscribe((notificationAddGroupBE) => {
      this.groups = notificationAddGroupBE;
    });
  }

  accepMember(groupId, memberId, groupMember) {
    this.groupMemberService.accepMember(groupId, memberId, groupMember).subscribe(() => {
      this.notification.showMessage('success', 'Thêm thành viên thành công!');
      this.getAllNotificationAddGroup();
    });
  }

  refuseMember(groupId, memberId) {
    this.groupMemberService.refuseMember(groupId, memberId).subscribe(() => {
      this.notification.showMessage('success', 'Từ chối thành công!');
      this.getAllNotificationAddGroup();
      this.modalRef.hide();
    });
  }

  openModalDelete(templateDeleteNotification: TemplateRef<any>, id: number, id2: number) {
    this.modalRef = this.modalService.show(
      templateDeleteNotification,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.groupId = id;
    this.memberId = id2;
  }
}
