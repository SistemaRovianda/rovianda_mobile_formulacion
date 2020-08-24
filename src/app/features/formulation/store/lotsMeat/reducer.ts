import { createReducer, on } from '@ngrx/store';
import { SET_OUTPUTS_MEAT } from './actions';
import { OutputsMeat } from 'src/app/shared/models/outputsMeat';


  let initialValue:OutputsMeat[]=[];
export const lotsMeatReducer = createReducer<OutputsMeat[]>(initialValue,
    on(SET_OUTPUTS_MEAT,(state,{outputsMeat})=>([...outputsMeat])) 
    );