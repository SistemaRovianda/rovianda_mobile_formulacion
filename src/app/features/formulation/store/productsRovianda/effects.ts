import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GET_ALL_PRODUCTS_ROVIANDA, SET_PRODUCTS_ROVIANDA, GET_INGREDIENTS_PRODUCT_ROVIANDA } from './actions';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/models/product.interface';
import { SET_INGREDIENTS } from '../ingredients-product-rovianda/actions';
import { productsRovianda } from './reducer';

@Injectable({
    providedIn: "root",
  })
export class productRoviandaEffects{


    constructor(private actions$:Actions,private productService:ProductsService){

    }

    gettingProductsRovianda=createEffect(()=>
    this.actions$.pipe(
        ofType(GET_ALL_PRODUCTS_ROVIANDA),
        exhaustMap(()=>this.productService.getProducts().pipe(
            switchMap((products:productsRovianda[])=>[
                SET_PRODUCTS_ROVIANDA({products})
            ])
            )
    )))

    gettingIngredientsProductRovianda = createEffect(()=>
    this.actions$.pipe(
        ofType(GET_INGREDIENTS_PRODUCT_ROVIANDA),
        exhaustMap((action)=>this.productService.getIngredientsByProductId(action.productId).pipe(switchMap((product:Product)=>[
            SET_INGREDIENTS({ingredients:product.ingredients})
        ])))
    ))
}