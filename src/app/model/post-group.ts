import {UserInfo} from './user-info';

export interface PostGroup {
  postGroupId?: number;

  content?: string;

  listImage?: any;

  dateCreated?: string;

  userInfo?: UserInfo;
}
