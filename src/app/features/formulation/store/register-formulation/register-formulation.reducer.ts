import { createReducer, on } from "@ngrx/store";
import { Formulation } from "src/app/shared/models/formulation.interface";
import * as fromRegisterActions from "./register-formulation.action";

export interface newState {
  formulation: Formulation;
  error: string;
  loading: boolean;
}

const initialState: newState = {
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

export const registerFormulationReducer = createReducer<newState>(
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
