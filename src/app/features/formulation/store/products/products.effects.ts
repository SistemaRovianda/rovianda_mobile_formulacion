import { Injectable } from "@angular/core";
import { ProductsService } from "src/app/shared/services/products.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsError,
} from "./products.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { Product } from "src/app/shared/models/product.interface";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsEffects {
  constructor(
    private _actions$: Actions,
    private _productService: ProductsService
  ) {}

  loadProductsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadProducts),
      exhaustMap((action) =>
        this._productService.getProducts().pipe(
          switchMap((products: Product[]) => [
            loadProductsSuccess({ products: products }),
          ]),
          catchError((error) => of(loadProductsError({ error: error })))
        )
      )
    )
  );
}
