//

import { createReducer, on } from "@ngrx/store";
import { defrostList } from "src/app/shared/models/defrost.interface";
import {
  clearLots,
  loadLots,
  loadLotsError,
  loadLotsSuccess,
} from "./defrost-listing.actions";

export interface defrostLotsState {
  loading: boolean;
  lots: defrostList[];
  error: string;
}

const initialState: defrostLotsState = {
  loading: false,
  lots: [],

  error: null,
};

export const defrostListingReducer = createReducer<defrostLotsState>(
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
    error: null,
  }))
);
