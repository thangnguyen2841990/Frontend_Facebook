import {UserInfo} from './user-info';

export interface Chat {
  id?: number;

  user1?: UserInfo;

  user2?: UserInfo;


  lastContent?: string

  dateCreated?: string;
}
