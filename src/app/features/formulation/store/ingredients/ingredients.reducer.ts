import { Ingredient } from "src/app/shared/models/formulation.interface";
import { IngredientsService } from "src/app/shared/services/ingredients.service";
import { on, createReducer } from "@ngrx/store";
import {
  addIngredientsProduct,
  addIngredientsModal,
  updateIngredients,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
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
  on(addIngredientsModalSuccess, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...new Set(ingredients)], // evitara la duplicidad de los elementos dentro del array
  })),
  on(updateIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients,
  }))
);
