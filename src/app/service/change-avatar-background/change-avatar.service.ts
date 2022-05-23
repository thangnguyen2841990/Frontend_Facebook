import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../../model/user-info';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ChangeAvatarService {

  constructor(private http: HttpClient) { }

  editAvatar(userId, avatar): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${API_URL}/userInfo/avt/${userId}`, avatar);
  }
  editBackGround(userId, background): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${API_URL}/userInfo/bgr/${userId}`, background);
  }

}
