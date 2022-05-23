import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${API_URL}/status`);
  }
}
