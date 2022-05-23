import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {map} from 'rxjs/operators';
import {User} from '../../model/user';
import {ChangePassword} from '../../model/change-password';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  userRegister: User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${API_URL}/login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(singUpForm): Observable<User> {
    return this.http.post(`${API_URL}/register`, singUpForm);
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  changePassword(currentUserId: number, changePassword: ChangePassword): Observable<User> {
    return this.http.post<User>(`${API_URL}/changePassword/${currentUserId}`, changePassword);
  }
}
