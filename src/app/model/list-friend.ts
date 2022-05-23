import {UserInfo} from './user-info';

export interface ListFriend {
  id?: number;
  userInfo?: UserInfo;
  friendsOfUserinfo?: UserInfo;
}
