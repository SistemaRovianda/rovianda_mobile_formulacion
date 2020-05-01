export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AppStateInterface {
  login: LoginState;
}
