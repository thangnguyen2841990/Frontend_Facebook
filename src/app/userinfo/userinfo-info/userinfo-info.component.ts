import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {NotificationService} from '../../service/notification/notification.service';
import {UserInfoService} from '../../service/user-info/user-info.service';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoExit} from '../../model/user-info-exit';
import {differenceInDays} from 'date-fns';
import {UserInfo} from '../../model/user-info';

@Component({
  selector: 'app-userinfo-info',
  templateUrl: './userinfo-info.component.html',
  styleUrls: ['./userinfo-info.component.css']
})
export class UserinfoInfoComponent implements OnInit {

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
  selectedFile: File;
  currentUserInfo: UserInfo;
  currentUserId: number;
  user: User;
  updateUserInfoForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userInfoService: UserInfoService,
              private userService: UserService,
              private router: Router) {
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.getUserInfoById(this.currentUserId);
  }


  getUserInfoById(id) {
    this.userInfoService.getUserInfoByUserId(id).subscribe(userinfo => {
      this.updateUserInfoForm = new FormGroup({
        id: new FormControl(userinfo.id),
        email: new FormControl(userinfo.email, ),
        fullName: new FormControl(userinfo.fullName, [Validators.required, Validators.pattern(this.regexUsername)]),
        avatar: new FormControl(userinfo.avatar, [Validators.required]),
        phoneNumber: new FormControl(userinfo.phoneNumber, [Validators.required, Validators.pattern('(0)[0-9]{9,10}')]),
        dateOfBirth: new FormControl(userinfo.dateOfBirth),
        address: new FormControl(userinfo.address, [Validators.required, Validators.pattern(this.regexUsername)]),
        backGround: new FormControl(userinfo.backGround),
        interest: new FormControl(userinfo.interest, [Validators.required, Validators.pattern(this.regexUsername)]),
        user: new FormControl(userinfo.user)
      });
    });
  }

  ngOnInit() {
  }

  updateUserinfo() {
    this.submitted = true;
    if (this.updateUserInfoForm.valid) {
      this.userInfoService.updateUserinfo(this.currentUserId, this.updateUserInfoForm.value).subscribe(() => {
        this.updateUserInfoForm.reset();
        this.notificationService.showMessage('success', 'Update thông tin cá nhân thành công!');
        this.router.navigateByUrl('/home');
      }, error => {
        this.notificationService.showMessage('error', 'Update thông tin cá nhân chưa thành công!');
      });
    } else {
      // @ts-ignore
      console(this.signUpForm.errors);
      this.notificationService.showMessage('error', 'Bạn cần nhập đúng định dạng!');
    }
  }

  phoneCheck($event) {
    this.phone = $event.target.value;
    this.userInfoService.phoneExitCheck(this.phone).subscribe((userInfoExit: UserInfoExit) => {
      this.isExitPhone = userInfoExit.status;
    });
    console.log(this.phone);
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
    console.log(this.selectedFile);
  }
}
