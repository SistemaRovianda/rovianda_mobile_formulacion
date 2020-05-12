import { createReducer, on } from "@ngrx/store";
import { AuthenticationUser } from "src/app/shared/models/storeState.interface";
import {
  loadUser,
  loadCurrentTokenSuccess,
  clearUser,
} from "./authentication.action";

export const authenticationReducer = createReducer<AuthenticationUser>(
  {
    token: null,
    currentToken: null,
    email: null,
    name: null,
    role: null,
  },

  on(loadUser, (state, userCredentials) => ({
    ...state,
    ...userCredentials,
  })),

  on(loadCurrentTokenSuccess, (state, { currentToken }) => ({
    ...state,
    currentToken,
  })),

  on(clearUser, (state) => ({
    ...state,
    email: null,
    role: null,
    name: null,
    token: null,
    currentToken: null,
  }))
);
