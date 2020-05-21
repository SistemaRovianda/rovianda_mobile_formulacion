import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import {
  loadIngredientsOutlet,
  loadIngredientsOutletSuccess,
  loadIngredientsOutletError,
} from "./ingredients-outlet.actions";

export interface IngredientsOutletState {
  loading: boolean;
  ingredientsOutlet: Ingredient[];
  error: string;
}

const initialState: IngredientsOutletState = {
  loading: false,
  ingredientsOutlet: [],
  error: null,
};

export const ingredientsOutletReducer = createReducer<IngredientsOutletState>(
  initialState,
  on(loadIngredientsOutlet, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadIngredientsOutletSuccess, (state, { ingredientsOutlet }) => ({
    ...state,
    loading: false,
    ingredientsOutlet,
  })),
  on(loadIngredientsOutletError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
