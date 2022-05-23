import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationAddFriend} from '../../model/notification-add-friend';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationAddFriendService {
  notificationAddFriends: NotificationAddFriend[] = [];

  constructor(private http: HttpClient) {
  }

  getAllNotificationAddFriend(toUserId: number): Observable<NotificationAddFriend[]> {
    return this.http.get<NotificationAddFriend[]>(`${API_URL}/addFriends/showNotification/${toUserId}`);
  }

  getAllSendNotificationAddFriend(fromUserId: number): Observable<NotificationAddFriend[]> {
    return this.http.get<NotificationAddFriend[]>(`${API_URL}/addFriends/showAllSendNotification/${fromUserId}`);
  }
}
