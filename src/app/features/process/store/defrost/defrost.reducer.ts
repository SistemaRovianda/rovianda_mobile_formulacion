import { createReducer, on } from "@ngrx/store";
import { defrost, defrostError, defrostSuccess } from "./defrost.actions";

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

export const defrostUpdateReducer = createReducer<defrostDetailState>(
  initialState,
  on(defrost, (state) => ({
    ...state,
    loading: true,
  })),
  on(defrostSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(defrostError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
