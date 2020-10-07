import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

export const LOTS_DRIEF = (appState: AppStateInterface) => appState.lotsDrief;

export const GET_LOTS_DRIEF_STORE = createSelector(LOTS_DRIEF, (state) => [
  ...state,
]);
