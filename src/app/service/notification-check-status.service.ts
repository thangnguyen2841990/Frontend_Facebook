import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationCheckStatus} from '../model/notification-check-status';
import {PostGroup} from '../model/post-group';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NotificationCheckStatusService {

  constructor(private http: HttpClient) {
  }

  getALlNoti(adminId): Observable<NotificationCheckStatus[]> {
    return this.http.get<NotificationCheckStatus[]>(`${API_URL}/checkStatus/${adminId}`);
  }
  findById(postId): Observable<PostGroup> {
    return this.http.get<PostGroup>(`${API_URL}/postGroups/post/${postId}`);
  }
}
