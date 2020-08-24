import { createReducer, on } from '@ngrx/store';
import { SET_ALL_QUALITY_USERS } from './actions';

export interface qualityUser{
    userId:string;
    fullName:string;
    rol:string;
    job:string;
  }
let initialValue:qualityUser[]=[];
export const qualityUserReducer = createReducer<qualityUser[]>(initialValue,
    on(SET_ALL_QUALITY_USERS,(state,{users})=>{
        console.log("Usuarios",users);
        return users?[...users]:[]
    }
    ) )