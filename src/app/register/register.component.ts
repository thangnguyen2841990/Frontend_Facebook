import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/auth/authentication.service';
import {NotificationService} from '../service/notification/notification.service';
import {Router} from '@angular/router';
import {UserInfoService} from '../service/user-info/user-info.service';
import {UserService} from '../service/user/user.service';
import {UserInfoExit} from '../model/user-info-exit';
import {
  addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears, differenceInHours,
  differenceInMinutes, differenceInSeconds
} from 'date-fns';
import {User} from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  email: string;
  username: string;
  phone: string;
  birthday: Date;
  today: Date;
  isExitEmail: boolean;
  isExitUsername: boolean;
  isExitPhone: boolean;
  invalidBirthday: boolean;
  userRegister: User;
  regexUsername = '^A-Za-z0-9 \\S||@||\\.||_';

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private userService: UserService,
              private router: Router) {
  }

  signUpForm: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(this.regexUsername)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // fullName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(0)[0-9]{9,10}')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      // address: new FormControl('', [Validators.required]),
    }
  );

  ngOnInit() {
  }

  // get signUpFormControl() {
  //   return this.signUpForm.controls;
  // }
  register() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.authenticationService.register(this.signUpForm.value).subscribe((userRegister) => {
        this.authenticationService.userRegister = userRegister;
        this.signUpForm.reset();
        this.notificationService.showMessage('success', 'Tạo tài khoản thành công!');
        this.router.navigateByUrl('/login');
      }, error => {
        this.notificationService.showMessage('error', 'Tạo tài khoản chưa thành công!');
      });
    } else {
      // @ts-ignore
      console(this.signUpForm.errors);
      this.notificationService.showMessage('error', 'Bạn cần nhập đúng định dạng!');
    }
  }

  checkEmail($event) {
    this.email = $event.target.value;
    this.userInfoService.emailExitCheck(this.email).subscribe((userInfoExit: UserInfoExit) => {
      this.isExitEmail = userInfoExit.status;
    });
    console.log(this.email);
  }

  usernameCheck($event) {
    this.username = $event.target.value;
    this.userService.usernameExitCheck(this.username).subscribe((userInfoExit: UserInfoExit) => {
      this.isExitUsername = userInfoExit.status;
    });
    console.log(this.username);
  }

  phoneCheck($event) {
    this.phone = $event.target.value;
    this.userInfoService.phoneExitCheck(this.phone).subscribe((userInfoExit: UserInfoExit) => {
      this.isExitPhone = userInfoExit.status;
    });
    console.log(this.phone);
  }

  checkBirthday($event) {
    this.birthday = new Date($event.target.value);
    this.today = new Date();
    this.invalidBirthday = false;
    const days = differenceInDays(this.today, this.birthday );
    if (days <= 0) {
      this.invalidBirthday = true;
    }
    // if (this.birthday.getDay() >= this.today.getDay()) {
    //   this.invalidBirthday = true;
    // }
  }
}
