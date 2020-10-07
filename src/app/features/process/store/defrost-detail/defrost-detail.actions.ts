import { createAction, props } from "@ngrx/store";
import { defrostDetail } from "src/app/shared/models/defrost.interface";

const DETAIL_LOTS = "[DETAIL] Load Detail Lot";

const DETAIL_LOTS_SUCCESS = "[DETAIL] Load Detail Lot Success";

const DETAIL_LOTS_ERROR = "[DETAIL] Load Detail Lot Error";

export const detailLot = createAction(DETAIL_LOTS, props<{ lot: number }>());

export const detailLotSuccess = createAction(
  DETAIL_LOTS_SUCCESS,
  props<{ detail: defrostDetail }>()
);

export const detailLotError = createAction(
  DETAIL_LOTS_ERROR,
  props<{ error: string }>()
);
