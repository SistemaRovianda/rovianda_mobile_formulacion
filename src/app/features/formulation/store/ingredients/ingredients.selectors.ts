import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const INGREDIENTS_STATE = (state: AppStateInterface) => state.ingredients;

export const SELECT_INGREDIENTS = createSelector(
  INGREDIENTS_STATE,
  (state) => state.ingredients
);

export const SELECT_INGREDIENTS_CHECKED = createSelector(
  INGREDIENTS_STATE,
  (state) => state.ingredients.filter((ing) => ing.checked)
);

export const SELECT_INGREDIENTS_LOADING = createSelector(
  INGREDIENTS_STATE,
  (state) => state.loading
);
