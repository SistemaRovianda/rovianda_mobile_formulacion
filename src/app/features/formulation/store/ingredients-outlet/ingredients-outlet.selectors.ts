import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const INGREDIENTS_OUTLET_STATE = (state: AppStateInterface) =>
  state.ingredientsOutlet;

export const SELECT_INGREDIENTS_OUTLET = createSelector(
  INGREDIENTS_OUTLET_STATE,
  (state) => state.ingredientsOutlet
);

export const SELECT_INGREDIENTS_OUTLET_LOADING = createSelector(
  INGREDIENTS_OUTLET_STATE,
  (state) => state.loading
);
