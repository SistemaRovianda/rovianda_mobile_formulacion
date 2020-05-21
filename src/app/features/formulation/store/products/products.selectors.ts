import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { createSelector } from "@ngrx/store";

const PRODUCTS_STATE = (state: AppStateInterface) => state.products;

export const SELECT_PRODUCTS = createSelector(
  PRODUCTS_STATE,
  (state) => state.products
);
