import { props, createAction } from "@ngrx/store";
import {
  IngredientP,
  IngredientM,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";
import { processIngredient } from "src/app/shared/models/process.interface";

const ADD_INGREDIENTS_PRODUCT = "[INGREDIENTS] Add Ingredients by Product";

const ADD_INGREDIENTS_PRODUCT_SUCCESS =
  "[INGREDIENTS] Add Ingredients by Product Success";

const ADD_INGREDIENTS_MODAL = "[INGREDIENTS] Add Ingredients by Modal";

const ADD_INGREDIENTS_MODAL_SUCCESS =
  "[INGREDIENTS] Add Ingredients by Modal Success";

const UPDATE_INGREDIENTS = "[INGREDIENTS] Update Ingredients";

const CLEAR_INGREDIENTS = "[INGREDIENTS] Clear Ingredients";

export const addIngredientsProduct = createAction(
  ADD_INGREDIENTS_PRODUCT,
  props<{ ingredients: IngredientP[] }>()
);

export const addIngredientsProductSuccess = createAction(
  ADD_INGREDIENTS_PRODUCT_SUCCESS,
  props<{ ingredients: IngredientC[] }>()
);

export const addIngredientsModal = createAction(
  ADD_INGREDIENTS_MODAL,
  props<{
    ingredientsModal: IngredientC[];
    ingredientsProductIn: IngredientC[];
  }>()
);

export const addIngredientsModalSuccess = createAction(
  ADD_INGREDIENTS_MODAL_SUCCESS,
  props<{ ingredients: IngredientC[] }>()
);

export const updateIngredients = createAction(
  UPDATE_INGREDIENTS,
  props<{ ingredients: IngredientC[] }>()
);

export const clearIngredients = createAction(CLEAR_INGREDIENTS);


export const getProcessIngredients  = createAction(
  "[INGREDIENTS] getProcessIngredients",
  props<{productId:number}>()
);

export const setProcessIngredients = createAction(
  "[INGREDIENTS] setProcessIngredients",
  props<{processIngredients:processIngredient[]}>()
);

export const deleteProcessIngredients = createAction(
  "[INGREDIENTS] deletingProcessIngredient by id",
  props<{processId:number}>()
);

export const deleteProcessIngredientsSuccess = createAction(
  "[INGREDIENTS] deletingProcessIngredient by id success"
);
