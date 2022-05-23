import {UserInfo} from './user-info';
import {Group} from './group';

export interface NotificationAddGroup {
  id?: number;
  fromUser?: UserInfo;
  toUser?: UserInfo;
  group?: Group;
  status?: any;
}
