import {UserInfo} from './user-info';

export interface NotificationAddFriend {
  id?: number;
  fromUser?: UserInfo;
  toUser?: UserInfo;
  status?: any;
}
