import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FriendListOfMeComponent} from './friend-list-of-me/friend-list-of-me.component';
import {MutualFriendComponent} from './mutual-friend/mutual-friend.component';


const routes: Routes = [
  {
    path: 'list',
    component: FriendListComponent
  },
  {
    path: 'list/me',
    component: FriendListOfMeComponent
  },
  {
    path: 'list/mutual/:id',
    component: MutualFriendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {
}
