import {UserInfo} from './user-info';
import {User} from './user';
import {GroupStatus} from './group-status';

export interface Group {
  id?: number;
  name?: string;
  avatar?: string;
  background?: string;
  user?: UserInfo;
  groupStatus?: GroupStatus;
}
