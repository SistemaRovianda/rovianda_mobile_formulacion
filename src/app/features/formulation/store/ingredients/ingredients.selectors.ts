import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const INGREDIENTS_STATE = (state: AppStateInterface) => state.ingredients;

export const SELECT_INGREDIENTS = createSelector(
  INGREDIENTS_STATE,
  (state) => state.ingredients
);
