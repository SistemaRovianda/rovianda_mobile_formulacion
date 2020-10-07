import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import { defrostList } from "src/app/shared/models/defrost.interface";
import { LotService } from "src/app/shared/services/lots.service";
import * as defrost from "./defrost-listing.actions";

@Injectable({
  providedIn: "root",
})
export class defrostListingEffects {
  constructor(private _actions$: Actions, private _lotService: LotService) {}

  loadLotsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(defrost.loadLots),
      exhaustMap((action) =>
        this._lotService.getDefrostLots().pipe(
          switchMap((lots: defrostList[]) => [
            defrost.loadLotsSuccess({ lots: lots }),
          ]),
          catchError((error) => of(defrost.loadLotsError(error)))
        )
      )
    )
  );
}
