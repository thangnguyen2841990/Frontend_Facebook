import {PostGroup} from './post-group';
import {UserInfo} from './user-info';

export interface NotificationCheckStatus {
  id?: number;

  postGroup?: PostGroup;

  admin?: UserInfo;
}
