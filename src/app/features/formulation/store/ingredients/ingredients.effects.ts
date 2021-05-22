import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addIngredientsProduct,
  addIngredientsModal,
  addIngredientsProductSuccess,
  addIngredientsModalSuccess,
  updateIngredients,
  getProcessIngredients,
  setProcessIngredients,
  deleteProcessIngredients,
  deleteProcessIngredientsSuccess,
} from "./ingredients.actions";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import {
  IngredientP,
  IngredientC,
} from "src/app/shared/models/ingredient.interface";
import { loadLots } from "../lots/lots.actions";
import { ProcessService } from "src/app/shared/services/process.service";

@Injectable({
  providedIn: "root",
})
export class IngredientsEffects {
  constructor(private _actions$: Actions,private processService:ProcessService) {}

  addIngredientsByProductEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addIngredientsProduct),
      exhaustMap((action) => {
        let ingredients: IngredientC[] = action.ingredients.map(
          // De los ingredientes obtenidos por el producto se le agregara una propiedad más, checked
          (ingredient: IngredientP) => {
            // Mapea cada ingrediente para colocar la propiedad
            return {
              ingredientId: ingredient.productId,
              description: ingredient.description,
              checked: true,
            };
          }
        );
        return [
          addIngredientsProductSuccess({ ingredients: ingredients }), // Agrega al tercer arreglo (en memoria) los ingredientes provenientes del producto
          loadLots({
            // Se le cargaran los ids de los ingredientes para cargar los lotes
            ingredientsId: ingredients
              .filter((ing) => ing.checked) // verifica que sean true / checks activos para ingredientes que tenga el producto
              .map((ing) => ing.ingredientId), // Obtiene los identificadores de los que cumplieron la condicion anterior
          }),
        ];
      })
    )
  );

  deleteProcessIngredientsById= createEffect( () => 
  this._actions$.pipe(
    ofType(deleteProcessIngredients),
    exhaustMap((action)=>this.processService.deleteProcessIngredientsById(action.processId).pipe(
      switchMap(()=>[deleteProcessIngredientsSuccess()]),
      catchError(()=>[deleteProcessIngredientsSuccess()])
    )
  ))
);

  getProcessIngredientsByProduct= createEffect( () => 
    this._actions$.pipe(
      ofType(getProcessIngredients),
      exhaustMap((action)=>this.processService.getProcessIngredientsByProduct(action.productId).pipe(
        switchMap((response)=>[setProcessIngredients({processIngredients:response})]),
        catchError(()=>[setProcessIngredients({processIngredients:[]})])
      )
    ))
  );

  addIngredientsForModalEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addIngredientsModal),
      exhaustMap((action) => {
        let withCheckIn = new Set(
          action.ingredientsProductIn.map((ip) => ip.ingredientId) // Obtiene los ids de los ingredientes que pertenecen al producto seleccionado
        );
        let merge: IngredientC[] = [
          // Mezcla de los ingredientes pertenecientes al producto seleccionado y los ingredientes con registro de salida
          ...action.ingredientsProductIn, // Coloca los ingredientes del producto en el arreglo merge
          ...action.ingredientsModal.filter(
            // filtrara los ingredientes con salida para evitar repetición
            (im) => !withCheckIn.has(im.ingredientId) // Evita que los identificadores entre arreglo 1 y 2 no se repitan, solo debe aparecer 1 vez el dato
          ),
        ];
        return [addIngredientsModalSuccess({ ingredients: merge })]; // Agrega ingredientes al arreglo 3 (ingredientes de modal)
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
