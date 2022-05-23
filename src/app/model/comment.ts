import {UserInfo} from './user-info';
import {Post} from './post';

export interface Comment {
  id?: number;

  content?: string;

  dateCreated?: string;

  userInfoPost?: UserInfo;

  postUser?: Post;
}
