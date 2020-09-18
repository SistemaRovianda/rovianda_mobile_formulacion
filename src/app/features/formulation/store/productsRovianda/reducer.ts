import { createReducer, on } from "@ngrx/store";
import { SET_PRODUCTS_ROVIANDA } from "./actions";

export interface productsRovianda {
  id: number;
  name: string;
  code: string;
  status: boolean;
  imgS3: string;
}
let initValue: productsRovianda[] = [];
export const productsRoviandaReducer = createReducer<productsRovianda[]>(
  initValue,
  on(SET_PRODUCTS_ROVIANDA, (state, { products }) => {
    return [...products];
  })
);
