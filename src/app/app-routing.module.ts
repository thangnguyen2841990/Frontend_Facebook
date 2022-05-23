import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {AboutUserComponent} from './about-user/about-user.component';
import {RegisterComponent} from './register/register.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {UserinfoInfoComponent} from './userinfo/userinfo-info/userinfo-info.component';
import {ChatComponent} from './chat/chat.component';
import {AdminListComponent} from './admin/admin-list/admin-list.component';
import {OtherUserInfoComponent} from './userinfo/other-user-info/other-user-info.component';
import {SearchByNameComponent} from './search-by-name/search-by-name.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'aboutUser/:id',
    component: AboutUserComponent
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then(module => module.GroupModule)
  },
  {
    path: 'friend',
    loadChildren: () => import('./friend/friend.module').then(module => module.FriendModule)
  },
  {
    path: 'addFriends',
    loadChildren: () =>
      import('./notification-add-friend/notification-add-friend.module').then(module => module.NotificationAddFriendModule)
  },
  {
    path: 'admin',
    component: AdminListComponent
  },
  {
    path: 'get/user-info',
    component: UserinfoInfoComponent
  },
  {
    path: 'chat/:id',
    component: ChatComponent

  },
  {
    path: 'view/otherUserInfo/:id',
    component: OtherUserInfoComponent
  },
  {
    path: 'search/:name',
    component: SearchByNameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
