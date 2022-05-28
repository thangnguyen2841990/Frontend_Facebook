import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../service/group/group.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {PostService} from '../../service/post/post.service';
import {NotificationService} from '../../service/notification/notification.service';
import {PostGroup} from '../../model/post-group';

@Component({
  selector: 'app-group-about',
  templateUrl: './group-about.component.html',
  styleUrls: ['./group-about.component.css']
})
export class GroupAboutComponent implements OnInit {
  groupId: number;
  groupName: string;
  groupAvatar: string;
  groupBackGround: string;
  modalRef: BsModalRef;
  currentUserId: number;
  postForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  selectedFile: any;
  postGroups: PostGroup[] = [];
   imageId: number;

  constructor(private activeRoter: ActivatedRoute,
              private groupService: GroupService,
              private modalService: BsModalService,
              private authenticationService: AuthenticationService,
              private postService: PostService,
              private notificationService: NotificationService) {
    this.activeRoter.paramMap.subscribe((paramap) => {
      this.groupId = +paramap.get('id');
    });
    this.currentUserId = this.authenticationService.currentUserValue.id;
    this.findGroupByID(this.groupId);
  }


  ngOnInit() {
    this.getAllPost();
  }

  findGroupByID(id) {
    this.groupService.findById(id).subscribe((group) => {
      this.groupAvatar = group.avatar;
      this.groupName = group.name;
      this.groupBackGround = group.background;
    });
  }

  openModalCreate(templateCreate: TemplateRef<any>, currentUserId: number) {
    this.modalRef = this.modalService.show(
      templateCreate,
      Object.assign({}, {class: 'gray modal-lg'})
    );
  }

  changeFile($event) {
    this.selectedFile = $event.target.files;
  }

  savePost() {
    if (this.postForm.valid) {
      const formData = new FormData();
      console.log(this.postForm.value);
      formData.append('content', this.postForm.value.content);
      if (this.selectedFile != null) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append('image', this.selectedFile[i]);
        }
      }
      console.log(this.currentUserId);
      console.log(formData);
      this.postService.savePostGroup(this.groupId, this.currentUserId, formData).subscribe(() => {
        this.postForm.reset();
        this.modalRef.hide();
      }, error => {
        this.notificationService.showMessage('error', 'Thêm mới bài đăng lỗi!');

      });
    } else {
      this.notificationService.showMessage('error', 'Bạn chưa nhập đủ thông tin!');

    }
  }
  getAllPost() {
    this.postService.getAllPostGroup(this.groupId).subscribe((posts) => {
      this.postGroups = posts;
    });
  }
  openModalShowImage(templateImage: TemplateRef<any>, imageId: number) {
    this.modalRef = this.modalService.show(
      templateImage,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.imageId = imageId;
    // this.getImageById(imageId);
  }
}
