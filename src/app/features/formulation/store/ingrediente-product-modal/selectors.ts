import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';

const INGREDIENTS_AVAILABLES = (state:AppStateInterface)=>state.ingredientsOfProductRoviandaModal;
export const GET_INGREDIENTS_AVAILABLES_STORE=createSelector(INGREDIENTS_AVAILABLES,(state)=>[...state]);