import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/models/product.interface";

const LOAD_PRODUCTS = "[Products] Load Products";

const LOAD_PRODUCTS_SUCCESS = "[Products] Load Products Success";

const LOAD_PRODUCTS_ERROR = "[Products] Load Products Error";

export const loadProducts = createAction(LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsError = createAction(
  LOAD_PRODUCTS_ERROR,
  props<{ error: string }>()
);
