import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Chat1} from '../model/chat1';
import {Observable} from 'rxjs';
import {Chat} from '../model/chat';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class Chat1Service {

  constructor(private http: HttpClient) { }

  getAllChat(user1Id: number, user2Id: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${API_URL}/chats?userId1=${user1Id}&userId2=${user2Id}`);
  }
  createChat(chat: Chat1): Observable<Chat1> {
    return this.http.post<Chat1>(API_URL + '/chats', chat);
  }

  getChat(id: number): Observable<Chat1> {
    return this.http.get<Chat1>(API_URL + `/chats/${id}`);
  }

  updateChat(id: number, chat: Chat): Observable<Chat1> {
    return this.http.put<Chat1>(API_URL + `/chats/${id}`, chat);
  }

  deleteChat(id1, id2): Observable<Chat1> {
    return this.http.delete<Chat1>(API_URL + `/chats/${id1}/${id2}`);
  }

}
