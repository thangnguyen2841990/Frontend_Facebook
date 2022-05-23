import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupMember} from '../../model/group-member';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {

  constructor(private http: HttpClient) {
  }

  accepMember(groupId, memberId, groupMember): Observable<GroupMember> {
    return this.http.post<GroupMember>(`${API_URL}/groupmembers/${groupId}/${memberId}`, groupMember);
  }
  accepMember1(adminId , groupId, memberId, groupMember): Observable<GroupMember> {
    return this.http.post<GroupMember>(`${API_URL}/groupmembers/${adminId}/${groupId}/${memberId}`, groupMember);
  }

  refuseMember(groupId, memberId): Observable<GroupMember> {
    return this.http.delete<GroupMember>(`${API_URL}/groupmembers/${groupId}/${memberId}`);
  }

  getAllMember(groupId): Observable<GroupMember[]> {
    return this.http.get<GroupMember[]>(`${API_URL}/groupmembers/${groupId}`);
  }

  deleteMember(memberId): Observable<GroupMember> {
    return this.http.delete<GroupMember>(`${API_URL}/groupmembers/${memberId}`);
  }
}
