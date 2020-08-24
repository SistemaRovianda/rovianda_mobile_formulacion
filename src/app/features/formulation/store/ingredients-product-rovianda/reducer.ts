import { createReducer, on } from '@ngrx/store';
import { SET_INGREDIENTS, UPDATE_INGREDIENTS_DEL_BY_ID } from './actions';
import { format } from 'url';


export interface ingredientsOfProductRovianda{
    productId:number;
    description:string;
    original:boolean;
  }

let initialValue:ingredientsOfProductRovianda[]=[];
export const ingredientProductRoviandaReducer = createReducer<ingredientsOfProductRovianda[]>(initialValue,
    on(SET_INGREDIENTS,(state,{ingredients})=>([...ingredients].map(x=>{return {...x,original:true}})))
    ,
    on(UPDATE_INGREDIENTS_DEL_BY_ID,(state,{ids})=>{
            
            console.log("IDS",ids);
            return [...state].filter(x=>!ids.includes(x.productId)?true:false
                         );
        }
        ));