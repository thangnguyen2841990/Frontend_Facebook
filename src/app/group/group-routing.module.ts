import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupCreateComponent} from './group-create/group-create.component';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupOtherComponent} from './group-other/group-other.component';
import {NotificationAddGroupService} from '../service/notificationAddGroup/notification-add-group.service';
import {NotificationGroupListComponent} from './notification-group-list/notification-group-list.component';
import {GroupListMemberComponent} from './group-list-member/group-list-member.component';
import {GroupListParticipationComponent} from './group-list-participation/group-list-participation.component';
import {GroupListAddComponent} from './group-list-add/group-list-add.component';
import {GroupAboutComponent} from './group-about/group-about.component';
import {NotificationCheckStatusComponent} from './notification-check-status/notification-check-status.component';


const routes: Routes = [
  {
    path: 'create',
    component: GroupCreateComponent
  },
  {
    path: 'list',
    component: GroupListComponent
  },
  {
    path: 'list/other',
    component: GroupOtherComponent
  },
  {
    path: 'list/notificationAddGroup',
    component: NotificationGroupListComponent
  },
  {
    path: 'list/member/:id',
    component: GroupListMemberComponent
  },
  {
    path: 'list/group',
    component: GroupListParticipationComponent
  },
  {
    path: 'list/add',
    component: GroupListAddComponent
  },
  {
    path: 'about/:id',
    component: GroupAboutComponent
  },
  {
    path: 'noti/list',
    component: NotificationCheckStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
