import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import { catalogLots } from "src/app/shared/models/lot.interface";
import { LotService } from "src/app/shared/services/lots.service";
import {
  catalogLoadLots,
  catalogLoadLotsError,
  catalogLoadLotsSuccess,
} from "./catalogLots.actions";

@Injectable({
  providedIn: "root",
})
export class CatalogLotsEffects {
  constructor(private _actions$: Actions, private _lotService: LotService) {}

  loadLotsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogLoadLots),
      exhaustMap((action) =>
        this._lotService.getCatalogLots().pipe(
          switchMap((lots: catalogLots[]) => [
            catalogLoadLotsSuccess({ response: lots }),
          ]),
          catchError((error) => of(catalogLoadLotsError(error)))
        )
      )
    )
  );
}
