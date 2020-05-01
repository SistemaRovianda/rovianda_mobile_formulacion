import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const SELECT_LOGIN = (state: AppStateInterface) => state.login;

export const SELECT_IS_LOADING = createSelector(
  SELECT_LOGIN,
  (state) => state.loading
);

export const SELECT_LOGIN_ERROR = createSelector(
  SELECT_LOGIN,
  (state) => state.error
);
