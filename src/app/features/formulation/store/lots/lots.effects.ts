import { Injectable } from "@angular/core";
import { LotService } from "src/app/shared/services/lots.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { loadLots, loadLotsSuccess, loadLotsError } from "./lots.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { Lot } from "src/app/shared/models/lot.interface";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LotsEffects {
  constructor(private _actions$: Actions, private _lotService: LotService) {}

  // loadLotsEffect$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(loadLots),
  //     exhaustMap((action) =>
  //       this._lotService.getLots(action.ingredientsId).pipe(
  //         switchMap((lots: Lot[]) => [loadLotsSuccess({ lots: lots })]),
  //         catchError((error) => of(loadLotsError(error)))
  //       )
  //     )
  //   )
  // );
}
