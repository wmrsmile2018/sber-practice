export interface TUser {
  id: string;
  email: string;
  createdAt?: string;
}

export interface TAuthUser {
  email: string;
  id: string;
}

export interface TAuthUserPresponse {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
}
