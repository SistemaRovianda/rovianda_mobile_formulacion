import { ProductState } from "src/app/features/formulation/store/products/products.reducer";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  token?: string;
  currentToken?: string;
}

export interface AppStateInterface {
  login: LoginState;
  auth: AuthenticationUser;
  register: any;
  products: ProductState;
}
