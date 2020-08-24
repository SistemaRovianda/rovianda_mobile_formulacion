import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';

const USERS =(state:AppStateInterface)=>state.qualityUsers;
export const GET_QUALITY_USERS_STORE= createSelector(USERS,(state)=>[...state]);