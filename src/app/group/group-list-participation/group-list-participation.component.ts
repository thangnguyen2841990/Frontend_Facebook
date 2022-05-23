import {Component, OnInit, TemplateRef} from '@angular/core';
import {GroupService} from '../../service/group/group.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Group} from '../../model/group';
import {GroupMember} from '../../model/group-member';

@Component({
  selector: 'app-group-list-participation',
  templateUrl: './group-list-participation.component.html',
  styleUrls: ['./group-list-participation.component.css']
})
export class GroupListParticipationComponent implements OnInit {
  currenUserId: number;
  groups: GroupMember[] = [];
  modalRef: BsModalRef;
  groupId: number;

  constructor(private groupService: GroupService,
              private authenticationService: AuthenticationService,
              private notification: NotificationService,
              private modalService: BsModalService) {
    this.currenUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllGroup();
  }

  getAllGroup() {
    this.groupService.getAllGroupParticipation(this.currenUserId).subscribe((groups) => {
      this.groups = groups;
    });
  }

  openModalOutGroup(templateOutGroup: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateOutGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.groupId = id;
  }

  outGroup() {
    this.groupService.outGroup(this.groupId, this.currenUserId).subscribe(() => {
      this.notification.showMessage('success', 'Bạn đã rời nhóm thành công!');
      this.getAllGroup();
      this.modalRef.hide();
    });
  }
}
