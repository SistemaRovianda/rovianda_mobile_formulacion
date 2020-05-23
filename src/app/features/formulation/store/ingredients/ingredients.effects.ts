import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addIngredientsProduct,
  addIngredientsModal,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
  updateIngredients,
} from "./ingredients.actions";
import { exhaustMap } from "rxjs/operators";
import {
  IngredientP,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";
import { loadLots } from "../lots/lots.actions";

@Injectable({
  providedIn: "root",
})
export class IngredientsEffects {
  constructor(private _actions$: Actions) {}

  addIngredientsByProductEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addIngredientsProduct),
      exhaustMap((action) => {
        let ingredients: IngredientC[] = action.ingredients.map(
          (ingredient: IngredientP) => {
            return {
              ingredientId: ingredient.id,
              description: ingredient.description,
              checked: true,
            };
          }
        );
        return [
          addIngredientsProductSuccess({ ingredients: ingredients }),
          loadLots({
            ingredientsId: ingredients
              .filter((ing) => ing.checked)
              .map((ing) => ing.ingredientId),
          }),
        ];
      })
    )
  );

  addIngredientsForModalEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addIngredientsModal),
      exhaustMap((action) => {
        let withCheckIn = new Set(
          action.ingredientsProductIn.map((ip) => ip.ingredientId)
        );
        let merge: IngredientC[] = [
          ...action.ingredientsProductIn,
          ...action.ingredientsModal.filter(
            (im) => !withCheckIn.has(im.ingredientId)
          ),
        ];
        return [addIngredientsModalSuccess({ ingredients: merge })];
      })
    )
  );

  updateIngredientsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateIngredients),
      exhaustMap((action) => {
        let checks = action.ingredients
          .filter((ing) => ing.checked)
          .map((ing) => ing.ingredientId);
        return [loadLots({ ingredientsId: checks })];
      })
    )
  );
}
