import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../../model/image';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getAllImagesByPostId(postId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${API_URL}/images/all/${postId}`);
  }
  deleteImage(id: number): Observable<Image> {
    return this.http.delete<Image>(`${API_URL}/images/${id}`);
  }
  getImageById(id: number): Observable<Image> {
    return this.http.get<Image>(`${API_URL}/images/${id}`);
  }
}
