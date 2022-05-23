import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  NotificationAddFriendListComponent
} from './notification-add-friend-list/notification-add-friend-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: NotificationAddFriendListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationAddFriendRoutingModule {
}
