import { createReducer, on } from "@ngrx/store";
import { SET_LOTS_DRIEF } from "./actions";

export interface lotsDrief {
  productId: number;
  lots: Array<lostRecordById>;
}

export interface lostRecordById {
  loteId: number;
  lotRecordId: number;
  date: string;
}
let initialValue: lotsDrief[] = [];
export const lotsDriefReducer = createReducer<lotsDrief[]>(
  initialValue,
  on(SET_LOTS_DRIEF, (state, { lotsDrief }) => [...lotsDrief])
);
