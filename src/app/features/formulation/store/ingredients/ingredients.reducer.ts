import { Ingredient } from "src/app/shared/models/formulation.interface";
import { IngredientsService } from "src/app/shared/services/ingredients.service";
import { on, createReducer, State } from "@ngrx/store";
import {
  addIngredientsModal,
  updateIngredients,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
  clearIngredients,
  setProcessIngredients,
  deleteProcessIngredients,
  deleteProcessIngredientsSuccess,
} from "./ingredients.actions";
import { IngredientC } from "src/app/shared/models/ingredient.interface";
import { processIngredient } from "src/app/shared/models/process.interface";

export interface IngredientsState {
  loading: boolean;
  ingredients: IngredientC[];
  error: string;
  processIngredients:processIngredient[],
  deletingIngredients:boolean
}

const initialState: IngredientsState = {
  loading: false,
  ingredients: [],
  error: null,
  processIngredients:[],
  deletingIngredients:false
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
  })),
  on(setProcessIngredients,(state,{processIngredients})=>({
    ...state,processIngredients
  })),
  on(deleteProcessIngredients,(state)=>({...state,deletingIngredients:true})),
  on(deleteProcessIngredientsSuccess,(state)=>({...state,deletingIngredients:false}))
);
