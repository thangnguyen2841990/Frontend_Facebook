import {Component, OnInit, TemplateRef} from '@angular/core';
import {NotificationCheckStatus} from '../../model/notification-check-status';
import {NotificationCheckStatusService} from '../../service/notification-check-status.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ImagePostGroup} from '../../model/image-post-group';

@Component({
  selector: 'app-notification-check-status',
  templateUrl: './notification-check-status.component.html',
  styleUrls: ['./notification-check-status.component.css']
})
export class NotificationCheckStatusComponent implements OnInit {
  notificationCheckStatus: NotificationCheckStatus[] = [];
  currentUserId: number;
  modalRef: BsModalRef;
  listImages: ImagePostGroup[] = [];
  content: string;
  postId: number;
  constructor(private notificationCheckStatusService: NotificationCheckStatusService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.getAllNotifiacationCheckStatus();

  }

  ngOnInit() {
  }

  getAllNotifiacationCheckStatus() {
    this.notificationCheckStatusService.getALlNoti(this.currentUserId).subscribe((listNoti) => {
      this.notificationCheckStatus = listNoti;
    });
  }

  openModalLookPost(templateEdit: TemplateRef<any>, postGroupId: number) {
    this.modalRef = this.modalService.show(
      templateEdit,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.postId = postGroupId;
    console.log(this.postId);
    this.findByID(this.postId);
  }
  findByID(id) {
    this.notificationCheckStatusService.findById(id).subscribe((postGroup) => {
        this.listImages = postGroup.listImage;
        this.content = postGroup.content;
        console.log(this.content);
    });
  }
}
