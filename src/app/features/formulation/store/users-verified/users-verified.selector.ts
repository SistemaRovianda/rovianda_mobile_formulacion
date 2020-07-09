import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const USERS_VERIFIED_STATE = (state: AppStateInterface) => state.usersVerified;

export const usersVerifiedSelector = createSelector(
  USERS_VERIFIED_STATE,
  (state) => state.usersVerified
);
