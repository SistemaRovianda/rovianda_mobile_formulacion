import { createAction, props } from "@ngrx/store";
import { defrostList } from "src/app/shared/models/defrost.interface";

const LOAD_LOTS = "[LOTS] Load Lots";

const LOAD_LOTS_SUCCESS = "[LOTS] Load Lots Success";

const LOAD_LOTS_ERROR = "[LOTS] Load Lots Error";

const CLEAR_LOTS = "[lOTS] Clear Lots";

export const loadLots = createAction(LOAD_LOTS);

export const loadLotsSuccess = createAction(
  LOAD_LOTS_SUCCESS,
  props<{ lots: defrostList[] }>()
);

export const loadLotsError = createAction(
  LOAD_LOTS_ERROR,
  props<{ error: string }>()
);
export const clearLots = createAction(CLEAR_LOTS);
