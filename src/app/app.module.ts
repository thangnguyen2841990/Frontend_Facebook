import { BrowserModule } from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import {ControlContainer, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { NgxBootstrapModalComponent } from './ngx-bootstrap-modal/ngx-bootstrap-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgbAlertModule, NgbDropdown, NgbDropdownMenu, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutUserComponent } from './about-user/about-user.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { NavbarAdminComponent } from './shared/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { UserinfoInfoComponent } from './userinfo/userinfo-info/userinfo-info.component';
import { ChatComponent } from './chat/chat.component';
import { OtherUserInfoComponent } from './userinfo/other-user-info/other-user-info.component';
import { NavBarComponent } from './notificationAddFriend/nav-bar/nav-bar.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    PostCreateComponent,
    NgxBootstrapModalComponent,
    AboutUserComponent,
    RegisterComponent,
    ChangePasswordComponent,
    NavbarComponent,
    AdminListComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    UserinfoInfoComponent,
    ChatComponent,
    OtherUserInfoComponent,
    NavBarComponent,
    SearchByNameComponent,




  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        FormsModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbDropdownModule,
        BrowserAnimationsModule,
        ScrollingModule,

    ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
    exports: [
        NavbarComponent,
        NavBarComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
