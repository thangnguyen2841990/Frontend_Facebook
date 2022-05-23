import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '../../model/group';
// @ts-ignore
import {GroupNameExit} from './/src/app/model/group-name-exit';
import {GroupMember} from '../../model/group-member';
import {UserInfo} from '../../model/user-info';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  findById(id): Observable<Group> {
    return this.http.get<Group>(`${API_URL}/groups/${id}`);
  }

  createGroup(id, group): Observable<Group> {
    return this.http.post<Group>(`${API_URL}/groups/${id}`, group);
  }

  showAllGroup(userID): Observable<any> {
    return this.http.get<any>(`${API_URL}/groups/findByUserId/${userID}`);
  }

  deleteGroup(id): Observable<Group> {
    return this.http.delete<Group>(`${API_URL}/groups/${id}`);
  }

  editGroup(id, group): Observable<Group> {
    return this.http.put<Group>(`${API_URL}/groups/${id}`, group);
  }

  groupNameCheckExit(id, name): Observable<GroupNameExit> {
    return this.http.get<GroupNameExit>(`${API_URL}/groups/checkNameExist/${id}/${name}`);
  }

  getAllGroupOtherUserId(id): Observable<any> {
    return this.http.get<any>(`${API_URL}/groups/findByOtherUserId/${id}`);
  }

  getAllGroupParticipation(currenUSerId): Observable<GroupMember[]> {
    return this.http.get<GroupMember[]>(`${API_URL}/groupmembers/groups/${currenUSerId}`);
  }

  outGroup(groupId, currenUserId): Observable<GroupMember> {
    return this.http.delete<GroupMember>(`${API_URL}/groupmembers/out/${groupId}/${currenUserId}`);
  }
  getAllUserAdd(id1, id2): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${API_URL}/groups/add/user/${id1}/${id2}`);
  }
}
