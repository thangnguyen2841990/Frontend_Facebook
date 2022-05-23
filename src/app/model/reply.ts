import {UserInfo} from './user-info';
import {Comment} from './comment';
import {Post} from './post';

export interface Reply {
  id?: number;

  content?: string;

  dateCreated?: string;

  userInfoComment?: UserInfo;

  comment?: Comment;

  postUser?: Post;
}
