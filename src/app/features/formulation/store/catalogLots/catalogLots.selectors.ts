import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const LOTS_STATE = (state: AppStateInterface) => state.catalogLots;

export const SELECT_CATALOG_LOTS = createSelector(
  LOTS_STATE,
  (state) => state.lots
);
