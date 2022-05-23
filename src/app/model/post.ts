import {UserInfo} from './user-info';
import {Comment} from './comment';
import {Status} from './status';
import {TotallikeCm} from './totallike-cm';
import {ListReply} from './list-reply';
import {Reply} from './reply';

export interface Post {
  postUserId?: number;

  content?: string;

  listImage?: any[];

  dateCreated?: string;

  userInfo: UserInfo;

  totalLike?: number;

  comments?: Comment[];

  totalComments: number;

  status: Status;

  totalLikeCm?: TotallikeCm[];

  listReply?: Reply[];

  totalReply?: number;
}
