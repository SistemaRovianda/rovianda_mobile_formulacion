import { createAction, props } from "@ngrx/store";
import { lotsDrief } from "./reducer";

export const GET_LOTS_DRIEF = createAction(
  "[LOTS_DRIEF], getting all lots Drief",
  props<{ ids: number[] }>()
);
export const SET_LOTS_DRIEF = createAction(
  "[LOTS_DRIEF], setting all lots Drief",
  props<{ lotsDrief: lotsDrief[] }>()
);
