import { createAction, props } from '@ngrx/store';
import { ingredientsOfProductRoviandaModal } from './reducer';
import { IngredientM } from 'src/app/shared/models/ingredient.interface';
import { ingredientsOfProductRovianda } from '../ingredients-product-rovianda/reducer';

export const SAVE_ALL_INGREDIENTS_AVAIALBLE = createAction("[ALL INGREDIENTS], saving ingredients",props<{products:IngredientM[],ingredientsOriginal:ingredientsOfProductRovianda[]}>());