import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikePost} from '../../model/like-post';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {

  constructor(private http: HttpClient) { }

  save(commentId: number, userId: number, like): Observable<LikePost> {
    return this.http.post<LikePost>(`${API_URL}/likeComments/${commentId}/${userId}`, like);
  }
  totalLike(commentId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/likeComments/${commentId}`);
  }
}
