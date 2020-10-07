//

import { createReducer, on } from "@ngrx/store";
import {
  detailLot,
  detailLotError,
  detailLotSuccess,
} from "./defrost-detail.actions";

export interface defrostDetailState {
  loading: boolean;
  detail: any;
  error: string;
}

const initialState: defrostDetailState = {
  loading: false,
  detail: null,
  error: null,
};

export const defrostDetailReducer = createReducer<defrostDetailState>(
  initialState,
  on(detailLot, (state) => ({
    ...state,
    loading: true,
  })),
  on(detailLotSuccess, (state, { detail }) => ({
    ...state,
    loading: false,
    detail,
  })),
  on(detailLotError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
