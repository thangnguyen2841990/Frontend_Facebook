import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupCreateComponent } from './group-create/group-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GroupListComponent } from './group-list/group-list.component';
import {NavbarComponent} from '../navbar/navbar.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { GroupOtherComponent } from './group-other/group-other.component';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';
import { GroupListMemberComponent } from './group-list-member/group-list-member.component';
import { GroupListParticipationComponent } from './group-list-participation/group-list-participation.component';
import { GroupListAddComponent } from './group-list-add/group-list-add.component';
import { GroupAboutComponent } from './group-about/group-about.component';
import { NotificationCheckStatusComponent } from './notification-check-status/notification-check-status.component';


@NgModule({
  declarations: [GroupCreateComponent, GroupListComponent, NavGroupComponent, GroupOtherComponent, NotificationGroupListComponent, GroupListMemberComponent, GroupListParticipationComponent, GroupListAddComponent, GroupAboutComponent, NotificationCheckStatusComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgbDropdownModule
  ]
})
export class GroupModule { }
