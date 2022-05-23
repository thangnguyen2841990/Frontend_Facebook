import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../../model/user-info';
import {UserInfoExit} from '../../model/user-info-exit';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(private http: HttpClient) {
  }

  getUserInfoByUserId(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${API_URL}/userInfo/${id}`);
  }
  getAllUserInfo(id: number): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${API_URL}/userInfo/all/${id}`);
  }
  getAllUserInf(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${API_URL}/userInfo`);
  }
  emailExitCheck(email: string): Observable<UserInfoExit> {
    return this.http.get<UserInfoExit>(`${API_URL}/userInfo/email/${email}`);
  }
  phoneExitCheck(phone: string): Observable<UserInfoExit> {
    return this.http.get<UserInfoExit>(`${API_URL}/userInfo/phone/${phone}`);
  }
  updateUserinfo(id: number, updateUserInfoForm ): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${API_URL}/userInfo/updateUserInfo/${id}`, updateUserInfoForm);
  }
  searchByName(name): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${API_URL}/userInfo/searchByName/${name}`);
  }
}
