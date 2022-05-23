import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Messager} from '../../model/messager';
import {Chat} from '../../model/chat';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MessagerService {

  constructor(private http: HttpClient) { }

  createMessager(fromId, toId, messager): Observable<Messager> {
    return  this.http.post<Messager>(`${API_URL}/messager/${fromId}/${toId}`, messager);
  }

  getMessagers(fromId, toId): Observable<Messager[]> {
    return this.http.get<Messager[]>(`${API_URL}/messager/${fromId}/${toId}`);
  }
  getMessagersOfUser(userId): Observable<Messager[]> {
    return this.http.get<Messager[]>(`${API_URL}/messager/${userId}`);
  }
  getChats(userId): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${API_URL}/messager/chat/${userId}`);
  }
}
