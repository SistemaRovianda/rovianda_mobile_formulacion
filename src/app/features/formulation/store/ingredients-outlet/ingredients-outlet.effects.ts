import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IngredientsService } from "src/app/shared/services/ingredients.service";
import { exhaustMap, switchMap, catchError, tap } from "rxjs/operators";
import {
  loadIngredientsOutlet,
  loadIngredientsOutletSuccess,
  loadIngredientsOutletError,
} from "./ingredients-outlet.actions";
import { of } from "rxjs";
import {
  IngredientM,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";
import { addIngredientsModal } from "../ingredients/ingredients.actions";

@Injectable({
  providedIn: "root",
})
export class IngredientsOutletEffects {
  constructor(
    private _actions$: Actions,
    private _ingredientsService: IngredientsService
  ) {}

  loadIngredientsOutletEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadIngredientsOutlet),
      exhaustMap((action) =>
        this._ingredientsService.getIngredients().pipe(
          switchMap((ingredients: IngredientM[]) => {
            let ingredientsM: IngredientC[] = ingredients.map((i) => {
              return {
                ingredientId: i.productId,
                description: i.description,
                checked: false,
              };
            });
            return [
              loadIngredientsOutletSuccess({ ingredientsOutlet: ingredients }),
              addIngredientsModal({
                ingredientsModal: ingredientsM,
                ingredientsProductIn: action.ingredientsProductIn,
              }),
            ];
          }),
          catchError((error) =>
            of(loadIngredientsOutletError({ error: error }))
          )
        )
      )
    )
  );
}
