import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserInfoExit} from '../../model/user-info-exit';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  usernameExitCheck(username: string): Observable<UserInfoExit> {
    return this.http.get<UserInfoExit>(`${API_URL}/username/${username}`);
  }
  passwordTrueCheck(username: string, password: string): Observable<UserInfoExit> {
    return this.http.get<UserInfoExit>(`${API_URL}/username-password/${username}/${password}`);
  }
  userBlockCheck(username: string): Observable<UserInfoExit> {
    return this.http.get<UserInfoExit>(`${API_URL}/userBlock/${username}`);
  }
}
