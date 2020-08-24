import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.interface';
import { productsRovianda } from './reducer';

export const GET_ALL_PRODUCTS_ROVIANDA = createAction("[PRODUCTS_ROVIANDA], getting drief of product rovianda");

export const SET_PRODUCTS_ROVIANDA = createAction("[PRODUCTS_ROVIANDA], setting products of rovianda",props<{products:productsRovianda[]}>());

export const GET_INGREDIENTS_PRODUCT_ROVIANDA= createAction("[PRODUCT_ROVIANDA], getting ingredients product Rovianda",props<{productId:number}>())