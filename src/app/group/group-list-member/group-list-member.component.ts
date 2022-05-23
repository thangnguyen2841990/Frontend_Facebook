import {Component, OnInit, TemplateRef} from '@angular/core';
import {GroupMemberService} from '../../service/groupMember/group-member.service';
import {GroupMember} from '../../model/group-member';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NotificationService} from '../../service/notification/notification.service';
import {GroupService} from '../../service/group/group.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendService} from '../../service/friend/friend.service';
import {ListFriend} from '../../model/list-friend';
import {AuthenticationService} from '../../service/auth/authentication.service';
import {NotificationAddGroup} from '../../model/notification-add-group';
import {NotificationAddGroupService} from '../../service/notificationAddGroup/notification-add-group.service';

@Component({
  selector: 'app-group-list-member',
  templateUrl: './group-list-member.component.html',
  styleUrls: ['./group-list-member.component.css']
})
export class GroupListMemberComponent implements OnInit {
  members: GroupMember[] = [];
  groupId: number;
  modalRef: BsModalRef;
  memberId: number;
  groupName: string;
  groupAvatar: string;
  currentUserId: number;
  friends: ListFriend[] = [];
  notificationAddGroup: NotificationAddGroup;
  groupIdAdd: number;
  groupIdAdd1: number;
  memID: number[] = [];
  notiIDList: number[] = [];
  toId: number;

  constructor(private groupMemberService: GroupMemberService,
              private activatedRoute: ActivatedRoute,
              private modalService: BsModalService,
              private notificationService: NotificationService,
              private groupService: GroupService,
              private friendService: FriendService,
              private authenticationService: AuthenticationService,
              private notificationAddGroupService: NotificationAddGroupService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.groupId = +paramMap.get('id');
      this.getAllMember(this.groupId);
      this.findGroupById(this.groupId);
    });
    this.currentUserId = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
    this.getAllFriend();
  }

  getAllMember(groupId) {
    this.groupMemberService.getAllMember(groupId).subscribe((members) => {
      this.members = members;
      for (let i = 0; i < members.length; i++) {
        this.memID.push(members[i].userInfo.id);
        console.log('ID member' + this.memID[i]);
      }
    });
  }

  openModalDeleteMember(templateDeleteMember: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateDeleteMember,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.memberId = id;
  }

  deleteMember() {
    this.groupMemberService.deleteMember(this.memberId).subscribe(() => {
      this.notificationService.showMessage('success', 'Xoá thành công!');
      this.getAllMember(this.groupId);
      this.getAllFriend();
      this.modalRef.hide();
    });
  }

  findGroupById(id) {
    this.groupService.findById(id).subscribe((group) => {
      this.groupName = group.name;
      this.groupIdAdd = group.id;
    });
  }

  openModalAdd(templateAdd: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      templateAdd,
      Object.assign({}, {class: 'gray modal-lg'})
    );
    this.toId = id;
    this.groupMemberService.getAllMember(id).subscribe(mem => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < mem.length; i++) {
        this.memID.push(mem[i].userInfo.id);
        console.log('ID member' + this.memID[i]);
      }
    });
    this.notificationAddGroupService.getAllNotiFromGroup(id).subscribe(mem => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < mem.length; i++) {
        this.notiIDList.push(mem[i].toUser.id);
        console.log('ID ussr' + this.notiIDList[i]);

      }
    });
  }

  getAllFriend() {
    this.friendService.getAllFriends(this.currentUserId).subscribe(friends => {
      this.friends = friends;
    });
  }

  addMember(fromId, toId, groupId, notificationaddgroup) {
    this.notificationAddGroupService.addNotificationAddGroup(fromId, toId, groupId, notificationaddgroup).subscribe(() => {
      this.notificationService.showMessage('success', 'Mời thành công!');
      this.notificationAddGroupService.getAllNotiFromGroup(this.toId).subscribe(mem => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < mem.length; i++) {
          this.notiIDList.push(mem[i].toUser.id);
          console.log('ID ussr' + this.notiIDList[i]);
        }
      });
      this.getAllFriend();
    });
  }
}
