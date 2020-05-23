import { Store, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";

const LOTS_STATE = (state: AppStateInterface) => state.lots;

export const SELECT_LOTS = createSelector(LOTS_STATE, (state) => state.lots);
