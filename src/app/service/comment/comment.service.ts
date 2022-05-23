import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../model/comment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  save(userId: number, postUserId: number, cm): Observable<Comment> {
    return this.http.post(`${API_URL}/comments/${userId}/${postUserId}`, cm);
  }

  getAllCOmment(currentUserID): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}/comments/${currentUserID}`);
  }

  updateComment(id, comment): Observable<Comment> {
    return this.http.put<Comment>(`${API_URL}/comments/${id}`, comment);
  }

  deleteComment(id): Observable<Comment> {
    return this.http.delete<Comment>(`${API_URL}/comments/${id}`);
  }

  findCommentByID(id): Observable<Comment> {
    return this.http.get<Comment>(`${API_URL}/comments/comment/${id}`);
  }
}
