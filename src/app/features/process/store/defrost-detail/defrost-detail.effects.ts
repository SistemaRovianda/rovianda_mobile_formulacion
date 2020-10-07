import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import { defrostDetail } from "src/app/shared/models/defrost.interface";
import { LotService } from "src/app/shared/services/lots.service";
import * as defrost from "./defrost-detail.actions";

@Injectable({
  providedIn: "root",
})
export class defrostDetailEffects {
  constructor(private _actions$: Actions, private _lotService: LotService) {}

  getdetailLotsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(defrost.detailLot),
      exhaustMap((action) =>
        this._lotService.getDetailDefrostLot(action.lot).pipe(
          switchMap((detail: defrostDetail) => [
            defrost.detailLotSuccess({ detail }),
          ]),
          catchError((error) => of(defrost.detailLotError(error)))
        )
      )
    )
  );
}
