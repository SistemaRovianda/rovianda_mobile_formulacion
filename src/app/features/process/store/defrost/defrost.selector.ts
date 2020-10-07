import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const STATE = (state: AppStateInterface) => state.defrost;

export const SELECT_DEFROST_DETAIL = createSelector(
  STATE,
  (state) => state.detail
);

export const SELECT_ISLOADING = createSelector(STATE, (state) => state.loading);
