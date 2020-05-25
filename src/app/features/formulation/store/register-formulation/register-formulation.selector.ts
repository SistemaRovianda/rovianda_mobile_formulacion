import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const FORMULATION_STATE = (state: AppStateInterface) => state.register;

export const SELECT_REGISTER_FORMULATION_LOADING = createSelector(
  FORMULATION_STATE,
  (state) => state.loading
);
