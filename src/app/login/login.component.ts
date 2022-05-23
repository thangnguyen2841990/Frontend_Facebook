import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/auth/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification/notification.service';
import {User} from '../model/user';
import {UserToken} from '../model/user-token';
import {UserInfoExit} from '../model/user-info-exit';
import {UserService} from '../service/user/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userRegister: User;
  username: string;
  password: string;
  submitted = false;
  currentUserRole: any;
  isExitUsername = true;
  isTruePassword: boolean;
  isBlockUser: boolean;
  regexUsername = '^A-Za-z0-9 \\S||@||\\.||_';

  loginForm: FormGroup = new FormGroup({

    username: new FormControl('', [Validators.required, Validators.pattern(this.regexUsername)]),

    password: new FormControl('', [Validators.required])
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userRegister = this.authenticationService.userRegister;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid && !this.isBlockUser) {
      this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
        this.currentUserRole = this.authenticationService.currentUserValue.roles;
        if (this.currentUserRole[0].authority === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/home');

        }

      }, error => {
      });
    } else {
      // @ts-ignore
      // console(this.loginForm.errors);
      // this.notificationService.showMessage('error', 'Bạn cần nhập đúng định dạng!');
    }
  }
  usernameCheck($event) {
    this.username = $event.target.value;
    this.isExitUsername = true;
    this.userService.usernameExitCheck(this.username).subscribe((userInfoExit: UserInfoExit) => {
      this.isExitUsername = userInfoExit.status;
    });
    this.isBlockUser = false;
    this.userService.userBlockCheck(this.username).subscribe((isBlockUser: UserInfoExit) => {
      this.isBlockUser = isBlockUser.status;
    });
  }
  passwordCheck($event) {
    this.password = $event.target.value;
    this.isTruePassword = true;
    if ((this.username != null) && this.isExitUsername) {
      this.userService.passwordTrueCheck(this.username, this.password).subscribe((userInfoExit: UserInfoExit) => {
        this.isTruePassword = userInfoExit.status;
      });
    }
  }
}
