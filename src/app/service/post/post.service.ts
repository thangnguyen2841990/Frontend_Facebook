import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../model/post';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPostOfFriends(currentUserId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/posts/friends/${currentUserId}`);
  }

  getAllPostOfUser(currentUserId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/posts/${currentUserId}`);
  }

  savePost(userId: number, post): Observable<Post> {
    return this.http.post<Post>(`${API_URL}/posts/${userId}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${API_URL}/posts/${id}`);
  }

  getPostByPostId(userId: number, postId: number): Observable<Post> {
    return this.http.get<Post>(`${API_URL}/posts/${userId}/${postId}`);
  }

  update(userId: number, postId: number, post): Observable<Post> {
   return   this.http.put<Post>(`${API_URL}/posts/${userId}/${postId}`, post);
  }
}
