export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  id?: string;
  email?: string;
  ingenioid?: number;
  rol?: string;
  token?: string;
  currentToken?: string;
}

export interface AppStateInterface {
  login: LoginState;
  auth: AuthenticationUser;
  register: any;
}
