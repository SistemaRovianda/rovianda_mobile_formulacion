import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';

const MEAT_STORE = (state:AppStateInterface)=>state.lostMeat;
export const GET_LOTS_MEAT_STORE = createSelector(MEAT_STORE,(state)=>[...state]);