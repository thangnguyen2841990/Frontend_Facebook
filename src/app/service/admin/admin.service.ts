import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../../model/user-dto';
import {User} from '../../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUserByAdmin(currentUserId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${API_URL}/admin/all/${currentUserId}`);
  }

  blockUserByAdmin(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/admin/${userId}`, user);
  }
  unblockUserByAdmin(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/admin/unlock/${userId}`, user);
  }

}
