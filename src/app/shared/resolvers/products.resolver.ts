import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AppStateInterface } from "../models/storeState.interface";
import { Store } from "@ngrx/store";
import { loadProducts } from "src/app/features/formulation/store/products/products.actions";

@Injectable()
export class ProductsResolve implements Resolve<boolean> {
  constructor(private _store: Store<AppStateInterface>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    this._store.dispatch(loadProducts());
    return true;
  }
}
