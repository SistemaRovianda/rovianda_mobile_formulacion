import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { SET_LOTS_DRIEF } from '../lotsDrief/actions';
import { exhaustMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { SET_INGREDIENTS, GET_ALL_INGREDIENTS_AVAILABLES, UPDATE_INGREDIENTS_DEL_BY_ID } from './actions';
import { LotService } from 'src/app/shared/services/lots.service';
import { lotsDrief } from '../lotsDrief/reducer';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IngredientsService } from 'src/app/shared/services/ingredients.service';
import { IngredientM } from 'src/app/shared/models/ingredient.interface';
import { ingredientsOfProductRoviandaModal } from '../ingrediente-product-modal/reducer';
import { SAVE_ALL_INGREDIENTS_AVAIALBLE } from '../ingrediente-product-modal/actions';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';
import { GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE } from './selector';

@Injectable({
    providedIn: "root",
  })
export class IngredientProductRoviandaEffects{

    constructor(private actions$:Actions,private lotsService:LotService,private ingredientsService:IngredientsService,
        private _store:Store<AppStateInterface>){
    }

    getLotsDrief = createEffect(()=>
    this.actions$.pipe(
    ofType(SET_INGREDIENTS),
    exhaustMap((action)=>
        this.lotsService.getLots(action.ingredients).pipe(switchMap((lotsDrief:lotsDrief[])=>[
            SET_LOTS_DRIEF({lotsDrief})]),
            
        )
    )
    )
    )

    getAllIngredientsAvalable = createEffect(()=>
    this.actions$.pipe(
        ofType(GET_ALL_INGREDIENTS_AVAILABLES),
        withLatestFrom(this._store.select(GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE)),
        exhaustMap(([action,ingredientsOriginal])=>this.ingredientsService.getIngredients().pipe(
            switchMap((ingredients:IngredientM[])=>[
                    SAVE_ALL_INGREDIENTS_AVAIALBLE({products:ingredients,ingredientsOriginal:ingredientsOriginal}) 
            ]    
            )
        ))
    ))

    updatingLots = createEffect(()=>
    this.actions$.pipe(
        ofType(UPDATE_INGREDIENTS_DEL_BY_ID),
        withLatestFrom(this._store.select(GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE)),
        exhaustMap(([action,ingredientsUpdated])=>this.lotsService.getLots(ingredientsUpdated).pipe(
            switchMap((lotsDrief)=>[
            SET_LOTS_DRIEF({lotsDrief})
            ])
        ))
    )
    )
}