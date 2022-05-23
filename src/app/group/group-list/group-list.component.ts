import {Component, OnInit, TemplateRef} from '@angular/core';
import {GroupService} from '../../service/group/group.service';
import {Group} from '../../model/group';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NotificationService} from '../../service/notification/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {GroupNameExit} from '../../model/group-name-exit';
import {FriendService} from '../../service/friend/friend.service';
import {ListFriend} from '../../model/list-friend';
import {GroupStatus} from '../../model/group-status';
import {GroupStatusService} from '../../service/group-status/group-status.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  currenUserId: number;
  modalRef: BsModalRef;
  idGroup: number;
  formGroup: FormGroup;
  groupName: string;
  groupNameExit: GroupNameExit;
  submitted = false;
  listStatus: GroupStatus[] = [];


  constructor(private groupService: GroupService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService,
              private notification: NotificationService,
              private friendService: FriendService,
              private groupStatusService: GroupStatusService,
              ) {
    this.currenUserId = this.authenticationService.currentUserValue.id;
    this.findById(this.idGroup);
  }

  ngOnInit() {
    this.getAllGroup();
    this.getALlGroupStatus();
  }

  getAllGroup() {
    this.groupService.showAllGroup(this.currenUserId).subscribe(data => {
      this.groups = data.content;
    });
  }

  openModalDelete(templateDeleteGroup: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.idGroup = id;
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.idGroup).subscribe(() => {
      this.notification.showMessage('success', 'Xoá thành công!');
      this.getAllGroup();
      this.modalRef.hide();
    });
  }

  openModalEdit(templateEditGroup: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateEditGroup,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.idGroup = id;
    this.findById(id);
  }

  findById(id) {
    // tslint:disable-next-line:no-shadowed-variable
    this.groupService.findById(id).subscribe((group) => {
      this.formGroup = new FormGroup({
        name: new FormControl(group.name, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        statusId: new FormControl(group.groupStatus.id, Validators.required),
        groupStatus: new FormControl('')
      });
    });
  }

  editGroup() {
    this.submitted = true;
    if (this.formGroup.valid && this.groupNameExit.status === false) {
      const status = this.formGroup.value;
      this.formGroup.patchValue({
        groupStatus: {
          id: status.statusId,
          name: ''
        }
      });
      this.groupService.editGroup(this.idGroup, this.formGroup.value).subscribe(() => {
        this.notification.showMessage('success', 'Cập nhật nhóm thành công !');
        this.getAllGroup();
        this.modalRef.hide();
      }, error => {
        this.notification.showMessage('error', 'Cập nhật nhóm lỗi !');
      });

    } else {
      this.notification.showMessage('error', 'Nhập thông tin không đúng !');
    }
  }

  checkGroupName($event) {
    this.groupName = $event.target.value;
    this.groupService.groupNameCheckExit(this.currenUserId, this.groupName).subscribe((groupNameExit) => {
      this.groupNameExit = groupNameExit;
      console.log(this.groupNameExit.status);
    });
  }
  getALlGroupStatus() {
    this.groupStatusService.getAll().subscribe(listStatus => {
      this.listStatus = listStatus;
    });
  }
}
