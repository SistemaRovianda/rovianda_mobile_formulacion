import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const INGREDIENTS_PRODUCT_STATE = (state: AppStateInterface) =>
  state.ingredientsProduct;

export const SELECT_INGREDIENTS_BY_PRODUCT = createSelector(
  INGREDIENTS_PRODUCT_STATE,
  (state) => state.ingredients
);

export const SELECT_INGREDIENTS_BY_PRODUCT_LOADING = createSelector(
  INGREDIENTS_PRODUCT_STATE,
  (state) => state.loading
);

export const SELECT_INGREDIENTS_BY_PRODUCT_ERROR = createSelector(
  INGREDIENTS_PRODUCT_STATE,
  (state) => state.error
);
