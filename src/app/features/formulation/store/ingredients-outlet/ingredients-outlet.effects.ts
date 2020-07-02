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
              // Agrega una propiedad checked a los ingredientes generales que tuvieron una salida (ingredientes que se muestran en modal)
              return {
                ingredientId: i.id,
                description: i.description,
                checked: false, // false debido a que no esta checkeado por parte del producto
              };
            });
            return [
              loadIngredientsOutletSuccess({ ingredientsOutlet: ingredients }), // Carga los ingredientes con salida en arreglo 2
              addIngredientsModal({
                ingredientsModal: ingredientsM, // Agrega los intedientes con salida al arreglo 3 para futura mezcla
                ingredientsProductIn: action.ingredientsProductIn, // Envia los ingredientes del producto seleccionados que se encuentran en el arreglo 3
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
