import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/shared/models/product.interface";
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsError,
} from "./products.actions";

export interface ProductState {
  loading: boolean;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
};

export const productsReducer = createReducer<ProductState>(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(loadProductsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
