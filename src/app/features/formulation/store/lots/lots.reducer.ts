//

import { Lot } from "src/app/shared/models/lot.interface";
import { createReducer, on } from "@ngrx/store";
import {
  loadLots,
  loadLotsSuccess,
  loadLotsError,
  clearLots,
} from "./lots.actions";

export interface LotsState {
  loading: boolean;
  lots: Lot[];
  error: string;
}

const initialState: LotsState = {
  loading: false,
  lots: [],
  error: null,
};

export const lotsReducer = createReducer<LotsState>(
  initialState,
  on(loadLots, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadLotsSuccess, (state, { lots }) => ({
    ...state,
    loading: false,
    lots,
  })),
  on(loadLotsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(clearLots, (state) => ({
    ...state,
    lots: [],
  }))
);
