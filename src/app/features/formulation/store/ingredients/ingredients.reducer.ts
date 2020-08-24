import { Ingredient } from "src/app/shared/models/formulation.interface";
import { IngredientsService } from "src/app/shared/services/ingredients.service";
import { on, createReducer, State } from "@ngrx/store";
import {
  addIngredientsModal,
  updateIngredients,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
  clearIngredients,
} from "./ingredients.actions";
import { IngredientC } from "src/app/shared/models/ingredient.interface";

export interface IngredientsState {
  loading: boolean;
  ingredients: IngredientC[];
  error: string;
}

const initialState: IngredientsState = {
  loading: false,
  ingredients: [],
  error: null,
};

export const ingredientsReducer = createReducer<IngredientsState>(
  initialState,
  on(addIngredientsProductSuccess, (state, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(addIngredientsModal, (state) => ({
    ...state,
    loading: true,
  })),
  on(addIngredientsModalSuccess, (state, { ingredients }) => ({
    ...state,
    loading: false,
    ingredients,
  })),
  on(updateIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(clearIngredients, (state) => ({
    ...state,
    ingredients: [],
  }))
);
