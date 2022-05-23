import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupStatus} from '../../model/group-status';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class GroupStatusService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<GroupStatus[]> {
    return this.http.get<GroupStatus[]>(`${API_URL}/groupStatus`);
  }
}
