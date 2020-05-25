import { createReducer, on } from "@ngrx/store";
import { Formulation } from "src/app/shared/models/formulation.interface";
import * as fromRegisterActions from "./register-formulation.action";

export interface RegisterFormulationState {
  formulation: Formulation;
  error: string;
  loading: boolean;
}

const initialState: RegisterFormulationState = {
  formulation: {
    productRoviandaId: null,
    lotId: "",
    temperature: "",
    temperatureWater: "",
    assigmentLot: {
      newLotId: "",
      dateEntry: null,
    },
    ingredient: {
      lotId: "",
      ingredientId: null,
    },
  },
  error: null,
  loading: false,
};

export const registerFormulationReducer = createReducer<
  RegisterFormulationState
>(
  initialState,
  on(fromRegisterActions.registerFormulation, (state, { formulation }) => ({
    ...state,
    loading: true,
  })),

  on(
    fromRegisterActions.registerFormulationSucess,
    (state, { formulation }) => ({
      ...state,
      formulation,
      loading: false,
    })
  ),

  on(fromRegisterActions.registerFormulationError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
