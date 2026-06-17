export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
