import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group/group.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
// @ts-ignore
import {GroupNameExit} from '../../model/group-name-exit';
import {GroupStatusService} from '../../service/group-status/group-status.service';
import {GroupStatus} from '../../model/group-status';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  groupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    statusId: new FormControl('', Validators.required),
    groupStatus: new FormControl('')
  });
  currentUserId: number;

  groupName: string;

  groupNameExit: GroupNameExit;
  submitted = false;
  listStatus: GroupStatus[] = [];

  constructor(private groupService: GroupService,
              private router: Router,
              private authService: AuthenticationService,
              private notification: NotificationService,
              private groupStatusService: GroupStatusService) {
    this.currentUserId = this.authService.currentUserValue.id;
  }

  ngOnInit() {
    this.getALlGroupStatus();
  }

  createGroup() {
    this.submitted = true;
    if (this.groupForm.valid && this.groupNameExit.status === false) {
      const status = this.groupForm.value;
      this.groupForm.patchValue({
        groupStatus: {
          id: status.statusId,
          name: ''
        }
      });
      this.groupService.createGroup(this.currentUserId, this.groupForm.value).subscribe(() => {
        this.notification.showMessage('success', 'Tạo nhóm thành công !');
        this.groupForm.reset();
        this.router.navigateByUrl('/group/list');
      }, error => {
        this.notification.showMessage('error', 'Tạo nhóm lỗi !');
      });

    } else {
      this.notification.showMessage('error', 'Nhập thông tin không đúng !');
    }
  }

  getALlGroupStatus() {
    this.groupStatusService.getAll().subscribe(listStatus => {
      this.listStatus = listStatus;
    });
  }

  checkGroupName($event) {
    this.groupName = $event.target.value;
    this.groupService.groupNameCheckExit(this.currentUserId, this.groupName).subscribe((groupNameExit) => {
      this.groupNameExit = groupNameExit;
      console.log(this.groupNameExit.status);
    });
  }
}
