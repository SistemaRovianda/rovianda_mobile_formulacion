import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';

const INGREDIENTS =(state:AppStateInterface)=>state.ingredientsOfProductRovianda;
export const GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE = createSelector(INGREDIENTS,(state)=>[...state]);
