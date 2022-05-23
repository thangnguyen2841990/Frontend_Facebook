import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserDto} from '../../model/user-dto';
import {AdminService} from '../../service/admin/admin.service';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../service/notification/notification.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  modalRef: BsModalRef;
  userId: number;
  userDTOs: UserDto[] = [];
  currentId: number;
  user: User = {};

  fromUser: FormGroup = new FormGroup({
    status: new FormControl('')
  });


  constructor(private adminService: AdminService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private modalService: BsModalService) {
    this.currentId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.adminService.getAllUserByAdmin(this.currentId).subscribe((userBe) => {
      this.userDTOs = userBe;
      $.fn.dataTable.ext.errMode = 'none';
      $('#example2').on( 'error.dt', function ( e, settings, techNote, message ) {
        console.log( 'An error has been reported by DataTables: ', message );
      } ) ;
      $(function() {
        $('#example2').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': true,
          'ordering': true,
          'info': true,
          'autoWidth': false,
          'responsive': true,
          'pageLength': 20,
        });
      });
    });
  }

  blockUser(id, user) {
    this.adminService.blockUserByAdmin(id, user).subscribe(() => {
      this.notificationService.showMessage('success', 'Block nguời dùng thành công!');
      this.modalRef.hide();
      this.getAllUser();
    });
  }

  unlockUser(id, user) {
    this.adminService.unblockUserByAdmin(id, user).subscribe(() => {
      this.notificationService.showMessage('success', 'Unlock nguời dùng thành công!');
      this.getAllUser();
    });
  }

  openModalBlockUser(templateBlockUser: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateBlockUser,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.userId = id;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
