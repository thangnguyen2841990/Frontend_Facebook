import {UserInfo} from './user-info';

export interface Message {
  id?: number;

  fromUser?: UserInfo;

  toUser?: UserInfo;

  dateCreated?: any;

  content?: any;
  status?: any;
}
