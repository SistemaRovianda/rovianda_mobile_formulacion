import { createAction, props, createSelector } from '@ngrx/store';
import { ingredientsOfProductRovianda } from './reducer';


export const SET_INGREDIENTS = createAction("[INGREDIENTS], settting ingredients to product",props<{ingredients:ingredientsOfProductRovianda[]}>())
export const GET_ALL_INGREDIENTS_AVAILABLES = createAction("[INGREDIENTS], getting ingredients avaialble");
export const UPDATE_INGREDIENTS_DEL_BY_ID = createAction("[INGREDIENTS], updating ingredients",props<{ids:number[]}>());