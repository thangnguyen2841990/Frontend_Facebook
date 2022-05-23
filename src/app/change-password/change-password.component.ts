
import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {AuthenticationService} from '../service/auth/authentication.service';
import {NotificationService} from '../service/notification/notification.service';
import {UserInfoService} from '../service/user-info/user-info.service';
import {UserService} from '../service/user/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePassword} from '../model/change-password';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  userRegister: User;
  currentUserId: number;
  changePasswordValue: ChangePassword = {};

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private userService: UserService,
              private router: Router) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
  }

  changePasswordForm: FormGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    }
  );


  ngOnInit() {
    this.userRegister = this.authenticationService.userRegister;
  }


  // get signUpFormControl() {
  //   return this.signUpForm.controls;
  // }
  changePassword() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      // this.changePasswordValue = this.changePasswordForm.value;
      this.authenticationService.changePassword(this.currentUserId, this.changePasswordForm.value).subscribe(() => {
        this.changePasswordForm.reset();
        this.notificationService.showMessage('success', 'Đổi mật khẩu thành công!');
        this.router.navigateByUrl('/login');
      }, error => {
        this.notificationService.showMessage('error', 'Đổi mật khẩu chưa thành công!');
      });
    } else {
      // @ts-ignore
      console(this.changePasswordForm.errors);
    }
  }
  login() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.authenticationService.login(this.changePasswordForm.value.username, this.changePasswordForm.value.password).subscribe(() => {
        this.notificationService.showMessage('success', 'Đổi mật khẩu thành công!');
        this.router.navigate(['home']);

      }, error => {
        this.notificationService.showMessage('error', 'Tên tài khoản hoặc mật khẩu chưa đúng!');
      });
    } else {
      // @ts-ignore
      console(this.loginForm.errors);

      this.notificationService.showMessage('error', 'Bạn cần nhập đúng định dạng!');
    }
  }
}


