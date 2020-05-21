import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IngredientsService } from "src/app/shared/services/ingredients.service";
import {
  loadIngredientsByProductID,
  loadIngredientsByProductIDSuccess,
  loadIngredientsByProductIDError,
} from "./ingredients-product.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { Product } from "src/app/shared/models/product.interface";
import { of } from "rxjs";
import { addIngredientsProduct } from "../ingredients/ingredients.actions";

@Injectable({
  providedIn: "root",
})
export class IngredientsProductEffects {
  constructor(
    private _actions$: Actions,
    private _ingredientsService: IngredientsService
  ) {}

  loadIngredientsByProductIdEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadIngredientsByProductID),
      exhaustMap((action) =>
        this._ingredientsService
          .getIngredientsByProductId(action.productId)
          .pipe(
            switchMap((product: Product) => [
              loadIngredientsByProductIDSuccess({
                ingredients: product.ingredients,
              }),
              addIngredientsProduct({
                ingredients: product.ingredients,
              }),
            ]),
            catchError((error) =>
              of(loadIngredientsByProductIDError({ error: error }))
            )
          )
      )
    )
  );
}
