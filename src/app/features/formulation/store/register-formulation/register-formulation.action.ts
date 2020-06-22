import { createAction, props } from "@ngrx/store";
import { Formulation } from "src/app/shared/models/formulation.interface";
import { create } from "domain";

const REGISTER_FORMULATION = "[REGISTER] Register formulation";
const REGISTER_FORMULATION_SUCCESS = "[REGISTER] Register Formulation Success";
const REGISTER_NEW_FORMULATION = "[REGISTER] Register New Formulation";
const REGISTER_FORMULATION_ERROR = "[REGISTER] Register Formulation Error";

export const registerFormulation = createAction(
  REGISTER_FORMULATION,
  props<{ formulation: Formulation }>()
);

export const registerFormulationSucess = createAction(
  REGISTER_FORMULATION_SUCCESS,
  props<{ successSave: boolean }>()
);

export const registerNewRegistration = createAction(REGISTER_NEW_FORMULATION);

export const registerFormulationError = createAction(
  REGISTER_FORMULATION_ERROR,
  props<{ error: string }>()
);
