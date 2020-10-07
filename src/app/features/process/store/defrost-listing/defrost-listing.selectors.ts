import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const STATE = (state: AppStateInterface) => state.defrostListing;

export const SELECT_DEFROST_LIST = createSelector(STATE, (state) =>
  state.lots && state.lots.length ? [...state.lots] : []
);
