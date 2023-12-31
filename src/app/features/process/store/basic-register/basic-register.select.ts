import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const SELECT_BASIC_REGISTER = (state: AppStateInterface) => state.basicRegister;

export const SELECT_BASIC_REGISTER_STATE = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.status
);

export const SELECT_BASIC_REGISTER_LOTS = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.lots
);

export const SELECT_BASIC_REGISTER_RESULT = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.result
);

export const SELECT_BASIC_REGISTER_IS_LOADING = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.loading
);

export const SELECT_CURRENT_PROCESS = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.currentProcess
);
