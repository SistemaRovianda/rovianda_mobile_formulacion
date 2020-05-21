import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addIngredientsProduct,
  addIngredientsModal,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
} from "./ingredients.actions";
import { exhaustMap } from "rxjs/operators";
import {
  IngredientP,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";
import { Ingredient } from "src/app/shared/models/formulation.interface";

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

        console.log("[Arreglo Interno]: ", ingredients);
        return [addIngredientsProductSuccess({ ingredients: ingredients })];
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
        console.log("merge: ", merge);
        return [addIngredientsModalSuccess({ ingredients: merge })];
      })
    )
  );
}
