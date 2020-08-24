import { createReducer, on } from '@ngrx/store';
import { SET_LOTS_DRIEF } from './actions';

export interface lotsDrief{
    productId:number;
    lots:Array<string>
  }
let initialValue:lotsDrief[]=[]
export const lotsDriefReducer=createReducer<lotsDrief[]>(initialValue,
    on(SET_LOTS_DRIEF,(state,{lotsDrief})=>([...lotsDrief])))