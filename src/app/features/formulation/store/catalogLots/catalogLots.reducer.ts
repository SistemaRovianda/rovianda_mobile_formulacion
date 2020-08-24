//

import { createReducer, on } from "@ngrx/store";
import { catalogLots } from "src/app/shared/models/lot.interface";
import {
  catalogLoadLots,
  catalogLoadLotsError,
  catalogLoadLotsSuccess,
} from "./catalogLots.actions";

export interface CatalogLotsState {
  loading: boolean;
  lots: catalogLots[];
  error: string;
}

const initialState: CatalogLotsState = {
  loading: false,
  lots: [],
  error: null,
};

export const CatalogLotsReducer = createReducer<CatalogLotsState>(
  initialState,
  on(catalogLoadLots, (state) => 
  {
    console.log("VALOR INICIAL DE INGREDIENTES");
    return ({
    ...state,
    loading: true,
  })
}),

  on(catalogLoadLotsSuccess, (state, { response }) =>{ 
    console.log("Seteando lotes de carne");
    return ({
    ...state,
    loading: false,
    lots: response,
  })
}),
  on(catalogLoadLotsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
