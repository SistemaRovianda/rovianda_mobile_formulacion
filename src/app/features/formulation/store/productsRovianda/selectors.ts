import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';
const PRODUCTS_ROVIANDA = (state: AppStateInterface) => state.productsRovianda;

export const GET_PRODUCTS_ROVIANDA_STORE = createSelector(PRODUCTS_ROVIANDA,(state)=>[...state]);