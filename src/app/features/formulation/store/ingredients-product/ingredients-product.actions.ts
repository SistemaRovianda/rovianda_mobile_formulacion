import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import { IngredientP } from "src/app/shared/models/ingredient.interface";

const LOAD_INGREDIENTS_BY_PRODUCT_ID =
  "[INGREDIENTS-PRODUCT] Load Ingrediente by ProductId";

const LOAD_INGREDIENTS_BY_PRODUCT_ID_SUCCESS =
  "[INGREDIENTS-PRODUCT] Load Ingrediente by ProductId Success";

const LOAD_INGREDIENTS_BY_PRODUCT_ID_ERROR =
  "[INGREDIENTS-PRODUCT] Load Ingrediente by ProductId Error";

export const loadIngredientsByProductID = createAction(
  LOAD_INGREDIENTS_BY_PRODUCT_ID,
  props<{ productId: string }>()
);

export const loadIngredientsByProductIDSuccess = createAction(
  LOAD_INGREDIENTS_BY_PRODUCT_ID_SUCCESS,
  props<{ ingredients: IngredientP[] }>()
);

export const loadIngredientsByProductIDError = createAction(
  LOAD_INGREDIENTS_BY_PRODUCT_ID_ERROR,
  props<{ error: string }>()
);
