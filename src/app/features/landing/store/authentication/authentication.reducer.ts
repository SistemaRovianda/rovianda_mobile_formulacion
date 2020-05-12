import { createReducer, on } from "@ngrx/store";
import { AuthenticationUser } from "src/app/shared/models/storeState.interface";
import {
  loadUser,
  loadCurrentTokenSuccess,
  clearUser,
} from "./authentication.action";

export const authenticationReducer = createReducer<AuthenticationUser>(
  {
    id: null,
    token: null,
    currentToken: null,
    ingenioid: null,
    email: null,
    rol: null,
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
    id: null,
    email: null,
    ingenioid: null,
    rol: null,
    token: null,
    currentToken: null,
  }))
);
