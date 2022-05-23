import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationAddFriendRoutingModule } from './notification-add-friend-routing.module';
import { NotificationAddFriendListComponent } from './notification-add-friend-list/notification-add-friend-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [NotificationAddFriendListComponent, NavBarComponent],
    exports: [
        NavBarComponent
    ],
    imports: [
        CommonModule,
        NotificationAddFriendRoutingModule,
        ReactiveFormsModule,
        ScrollingModule,
        NgbDropdownModule
    ]
})
export class NotificationAddFriendModule { }
