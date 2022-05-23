import {Component, OnInit, TemplateRef} from '@angular/core';
import {NotificationAddGroup} from '../../model/notification-add-group';
import {NotificationAddGroupService} from '../../service/notificationAddGroup/notification-add-group.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NotificationService} from '../../service/notification/notification.service';
import {GroupMemberService} from '../../service/groupMember/group-member.service';
import {GroupMember} from '../../model/group-member';

@Component({
  selector: 'app-group-list-add',
  templateUrl: './group-list-add.component.html',
  styleUrls: ['./group-list-add.component.css']
})
export class GroupListAddComponent implements OnInit {
  notifiAddGroup: NotificationAddGroup[] = [];
  currentUserId: number;
  modalRef: BsModalRef;
  notiId: number;
  member: GroupMember;

  constructor(private notifiAddGroupService: NotificationAddGroupService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService,
              private notificationService: NotificationService,
              private groupMemberService: GroupMemberService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllNoti();
  }

  getAllNoti() {
    this.notifiAddGroupService.getAllNotificationAddGroup1(this.currentUserId).subscribe(noti => {
      this.notifiAddGroup = noti;
    });
  }

  openModalDelete(templateDeleteNotification: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteNotification,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.notiId = id;
  }

  refuseGroup() {
    this.notifiAddGroupService.deleteNoti(this.notiId).subscribe(() => {
      this.notificationService.showMessage('success', 'Đã từ chối!');
      this.getAllNoti();
      this.modalRef.hide();
    });
  }

  acceptGroup(adminId, groupId, memberId, member) {
    this.groupMemberService.accepMember1(adminId, groupId, memberId, member).subscribe(() => {
      this.notificationService.showMessage('success', 'Bạn đồng ý gia nhập!');
      this.getAllNoti();
    });
  }

}
