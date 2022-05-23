import {UserInfo} from './user-info';

export interface Messager {
  id?: number;

  fromUser?: UserInfo;

  toUser?: UserInfo;
  content?: string;

  dateCreated?: any;
}
