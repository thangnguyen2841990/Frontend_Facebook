import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FriendRoutingModule} from './friend-routing.module';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FriendListOfMeComponent} from './friend-list-of-me/friend-list-of-me.component';
import {MutualFriendComponent} from './mutual-friend/mutual-friend.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NavFriendComponent } from './nav-friend/nav-friend.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [FriendListComponent, FriendListOfMeComponent, MutualFriendComponent, NavFriendComponent],
  imports: [
    CommonModule,
    FriendRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgbDropdownModule
  ],
  exports: [

  ]
})
export class FriendModule {
}
