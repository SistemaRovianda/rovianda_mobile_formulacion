import { createAction, props } from "@ngrx/store";

const UPDATE_LOTS = "[UPDATE DEFROST] Update Detail Lot";

const UPDATE_LOTS_SUCCESS = "[UPDATE DEFROST] Update Detail Lot Success";

const UPDATE_LOTS_ERROR = "[UPDATE DEFROST] Update Detail Lot Error";

export const defrost = createAction(
  UPDATE_LOTS,
  props<{ lot: number; body: any }>()
);

export const defrostSuccess = createAction(UPDATE_LOTS_SUCCESS);

export const defrostError = createAction(
  UPDATE_LOTS_ERROR,
  props<{ error: string }>()
);
