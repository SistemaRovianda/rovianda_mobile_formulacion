import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const STATE = (state: AppStateInterface) => state.defrostDetail;

export const SELECT_DEFROST_DETAIL = createSelector(
  STATE,
  (state) => state.detail
);
