import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikePost} from '../../model/like-post';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikePostService {

  constructor(private http: HttpClient) { }

  save(userId: number, postId: number, like): Observable<LikePost> {
    return this.http.post<LikePost>(`${API_URL}/likePosts/${userId}/${postId}`, like);
  }
}
