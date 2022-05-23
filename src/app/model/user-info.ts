import {User} from './user';

export interface UserInfo {
  id?: number;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  avatar?: string;
  backGround?: string;
  interest?: string;
  user?: User;
}
