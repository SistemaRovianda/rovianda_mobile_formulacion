// Obtener ingredientes que fueorn registrados como salidas en su lote

import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import {
  IngredientM,
  IngredientP,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";

const LOAD_INGREDIENTS_OUTLET =
  "[INGREDIENTS-OUTLET] Load Ingredients with outlet";

const LOAD_INGREDIENTS_OUTLET_SUCCESS =
  "[INGREDIENTS-OUTLET] Load Ingredients with outlet Success";

const LOAD_INGREDIENTS_OUTLET_ERROR =
  "[INGREDIENTS-OUTLET] Load Ingredients with outlet Error";

// Obtener ingredientes que fueron registrados con salida en su lote

export const loadIngredientsOutlet = createAction(
  LOAD_INGREDIENTS_OUTLET,
  props<{ ingredientsProductIn: IngredientC[] }>()
);

export const loadIngredientsOutletSuccess = createAction(
  LOAD_INGREDIENTS_OUTLET_SUCCESS,
  props<{ ingredientsOutlet: IngredientM[] }>()
);

export const loadIngredientsOutletError = createAction(
  LOAD_INGREDIENTS_OUTLET_ERROR,
  props<{ error: string }>()
);
