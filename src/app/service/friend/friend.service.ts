import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../../model/friend';
import {NotificationAddFriend} from '../../model/notification-add-friend';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) {
  }

  getAllFriends(userId: number): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${API_URL}/addFriends/${userId}`);
  }

  addFriend(fromId, toId, notificationAddFriend): Observable<NotificationAddFriend> {
    return this.http.post<NotificationAddFriend>(`${API_URL}/addFriends/${fromId}/${toId}`, notificationAddFriend);
  }

  acceptFriend(fromId, toId, notificationAddFriend): Observable<NotificationAddFriend> {
    return this.http.post<NotificationAddFriend>(`${API_URL}/addFriends/add/${fromId}/${toId}`, notificationAddFriend);
  }

  deleteAddFriend(notificationId: number): Observable<NotificationAddFriend> {
    return this.http.delete<NotificationAddFriend>(`${API_URL}/addFriends/${notificationId}`);
  }

  cancleAddFriend(fromId: number, toId: number): Observable<NotificationAddFriend> {
    return this.http.delete<NotificationAddFriend>(`${API_URL}/addFriends/cancle/${fromId}/${toId}`);
  }
  unfriend(fromId: number, toId: number): Observable<NotificationAddFriend> {
    return this.http.delete<NotificationAddFriend>(`${API_URL}/addFriends/delete/${fromId}/${toId}`);
  }
}
