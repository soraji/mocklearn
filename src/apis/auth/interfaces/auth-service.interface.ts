import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUserItem } from 'src/common/types/context';


export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}

export interface IAuthServiceSetRefreshToken{
  user: User;
  res : Response;
}
