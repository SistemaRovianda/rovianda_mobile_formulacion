import { createReducer, on } from "@ngrx/store";

import * as fromLoginActions from "./login.action";
import { LoginState } from "src/app/shared/models/storeState.interface";

const STATE_INITIAL_LOGIN: LoginState = { error: null, loading: false };

export const loginReducer = createReducer<LoginState>(
  STATE_INITIAL_LOGIN,
  on(fromLoginActions.signIn, (state) => ({ ...state, loading: true })),
  on(fromLoginActions.finishLoad, (state) => ({ ...state, loading: false })),
  on(fromLoginActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
