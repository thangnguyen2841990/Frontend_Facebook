import {Group} from './group';
import {UserInfo} from './user-info';

export interface GroupMember {
  id?: number;
  group?: Group;
  userInfo?: UserInfo;
  status?: number;
}
