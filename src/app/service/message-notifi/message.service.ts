import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../model/message';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAll(currentUserId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${API_URL}/messages/${currentUserId}`);
  }
  getTotalMessage(currentUserId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/messages/total/${currentUserId}`);
  }
  deleteMessage(id): Observable<Message> {
    return this.http.delete<Message>(`${API_URL}/messages/${id}`);
  }
}
