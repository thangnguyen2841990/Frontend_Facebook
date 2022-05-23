import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationAddGroup} from '../../model/notification-add-group';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationAddGroupService {

  constructor(private http: HttpClient) {
  }

  getAllNotificationAddGroup(toUserID: number): Observable<NotificationAddGroup[]> {
    return this.http.get<NotificationAddGroup[]>(`${API_URL}/notificationAddGroups/showNotificationAddGroup/${toUserID}`);
  }

  getAllNotificationAddGroup1(toUserID: number): Observable<NotificationAddGroup[]> {
    return this.http.get<NotificationAddGroup[]>(`${API_URL}/notificationAddGroups/showNotificationAddGroup/add/${toUserID}`);
  }

  createNotificationAddGroup(fromUserId, toUserId, groupId, notification): Observable<NotificationAddGroup> {
    return this.http.post<NotificationAddGroup>(`${API_URL}/notificationAddGroups/${fromUserId}/${toUserId}/${groupId}`, notification);
  }

  addNotificationAddGroup(fromUserId, toUserId, groupId, notification): Observable<NotificationAddGroup> {
    return this.http.post<NotificationAddGroup>(`${API_URL}/notificationAddGroups/add/${fromUserId}/${toUserId}/${groupId}`, notification);
  }

  deleteNoti(id): Observable<NotificationAddGroup> {
    return this.http.delete<NotificationAddGroup>(`${API_URL}/notificationAddGroups/${id}`);
  }

  getAllNotiFromUSer(id): Observable<NotificationAddGroup[]> {
    return this.http.get<NotificationAddGroup[]>(`${API_URL}/notificationAddGroups/from/${id}`);
  }
  getAllNotiFromGroup(id): Observable<NotificationAddGroup[]> {
    return this.http.get<NotificationAddGroup[]>(`${API_URL}/notificationAddGroups/group/${id}`);
  }
}
