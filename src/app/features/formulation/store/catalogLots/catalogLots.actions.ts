import { createAction, props } from "@ngrx/store";
import { Lot, catalogLots } from "src/app/shared/models/lot.interface";

const LOAD_LOTS = "[LOTS] Load Lots";

const LOAD_LOTS_SUCCESS = "[LOTS] Load Lots Success";

const LOAD_LOTS_ERROR = "[LOTS] Load Lots Error";

export const catalogLoadLots = createAction(
  LOAD_LOTS,
  props<{ materialId: number }>()
);

export const catalogLoadLotsSuccess = createAction(
  LOAD_LOTS_SUCCESS,
  props<{ response: catalogLots[] }>()
);

export const catalogLoadLotsError = createAction(
  LOAD_LOTS_ERROR,
  props<{ error: string }>()
);
