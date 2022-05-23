import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reply} from '../../model/reply';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ReplyCommentService {

  constructor(private http: HttpClient) {
  }

  getAllReplyOfComment(cmId): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${API_URL}/reply/${cmId}`);
  }

  createReply(currentUserId, commentId, postId, reply): Observable<Reply> {
    return this.http.post<Reply>(`${API_URL}/reply/${currentUserId}/${commentId}/${postId}`, reply);
  }

  editReply(id, reply): Observable<Reply> {
    return this.http.put<Reply>(`${API_URL}/reply/${id}`, reply);
  }
  deleteReply(id): Observable<Reply> {
    return this.http.delete<Reply>(`${API_URL}/reply/${id}`);
  }
  getById(id): Observable<Reply> {
    return this.http.get<Reply>(`${API_URL}/reply/${id}`);
  }
}
