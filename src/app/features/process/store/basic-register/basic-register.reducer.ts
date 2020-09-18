import { createReducer, on } from "@ngrx/store";
import { BasicRegister } from "src/app/shared/models/basic-register.interface";
import * as fromBasicRegisterActions from "./basic-register.actions";

const STATE_STATE_BASIC_REGISTER: BasicRegister = {
  status: null,
  lots: [],
  result: false,
  error: null,
  loading: false,
  currentProcess: null,
  isSelected: false,
};

export const basicRegisterReducer = createReducer(
  STATE_STATE_BASIC_REGISTER,
  on(
    fromBasicRegisterActions.basicRegisterLoadData,
    (state, { currentProcess }) => {
      console.log("CURRENT PROCEESS", currentProcess);
      return {
        ...state,
        currentProcess,
      };
    }
  ),
  on(
    fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat,
    (state, { lots }) => ({ ...state, lots })
  ),
  on(
    fromBasicRegisterActions.basicRegisterLoadMaterials,
    (state, { materials }) => ({ ...state, materials })
  ),
  on(
    fromBasicRegisterActions.basicRegisterStartRegisterNewProcess,
    (state) => ({ ...state, loading: true })
  ),
  on(
    fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess,
    (state) => ({ ...state, loading: false })
  ),
  on(
    fromBasicRegisterActions.basicRegisterNewProcessFailure,
    (state, { error }) => ({ ...state, error })
  ),

  on(
    fromBasicRegisterActions.basiRegisterIsSelected,
    (state, { isSelected }) => ({
      ...state,
      isSelected,
    })
  )
);
