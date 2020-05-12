import { createAction, props } from "@ngrx/store";
import { Formulation } from "src/app/shared/models/formulation.interface";

const REGISTER = "[REGISTER] Register formulation";
const REGISTER_SUCCESS = "[REGISTER] Register Formulation Success";
const REGISTER_ERROR = "[REGISTER] Register Formulation Error";

export const register = createAction(
  REGISTER,
  props<{ formulation: Formulation }>()
);

export const registerSucess = createAction(
  REGISTER_SUCCESS,
  props<{ formulation: Formulation }>()
);

export const registerError = createAction(
  REGISTER_ERROR,
  props<{ error: string }>()
);
