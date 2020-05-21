import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import {
  loadIngredientsByProductID,
  loadIngredientsByProductIDSuccess,
  loadIngredientsByProductIDError,
} from "./ingredients-product.actions";
import { IngredientP } from "src/app/shared/models/ingredient.interface";

export interface IngredientsProductState {
  loading: boolean;
  ingredients: IngredientP[];
  error: string;
}

export const initialState: IngredientsProductState = {
  loading: false,
  ingredients: [],
  error: null,
};

export const ingredientsProductReducer = createReducer<IngredientsProductState>(
  initialState,
  on(loadIngredientsByProductID, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadIngredientsByProductIDSuccess, (state, { ingredients }) => ({
    ...state,
    loading: false,
    ingredients,
  })),
  on(loadIngredientsByProductIDError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
