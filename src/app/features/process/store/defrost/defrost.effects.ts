import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap } from "rxjs/operators";
import { LotService } from "src/app/shared/services/lots.service";
import { ToastService } from "src/app/shared/services/toast.service";
import * as defrost from "./defrost.actions";

@Injectable({
  providedIn: "root",
})
export class defrostUpdateEffects {
  constructor(
    private _actions$: Actions,
    private _lotService: LotService,
    private toastService: ToastService,
    private router: Router
  ) {}

  getdetailLotsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(defrost.defrost),
      exhaustMap((action) =>
        this._lotService.putDetailDefrostLot(action.lot, action.body).pipe(
          switchMap(() => [defrost.defrostSuccess()]),
          catchError((error) => of(defrost.defrostError(error)))
        )
      )
    )
  );

  getdetailLotsSuccessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(defrost.defrostSuccess),
      exhaustMap((action) => {
        this.toastService.presentToastSuccess();
        this.router.navigate([`/menu`]);
        return [];
      }),
      catchError((error) => {
        this.toastService.presentToastError();
        return [];
      })
    )
  );
}
