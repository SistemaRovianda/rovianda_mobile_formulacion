import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap, tap, delay } from "rxjs/operators";
import { Formulation } from "src/app/shared/models/formulation.interface";
import { FormulationService } from "src/app/shared/services/formulation.service";
import * as fromRegisterActions from "./register-formulation.action";
import { clearIngredients } from "../ingredients/ingredients.actions";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { clearLots } from "../lots/lots.actions";

@Injectable({
  providedIn: "root",
})
export class RegisterFormulationEffects {
  constructor(
    private actions$: Actions,
    private _router: Router,
    private formulationService: FormulationService,
    private _toastService: ToastService
  ) {}

  addFormulation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRegisterActions.registerFormulation),
      delay(2000),
      exhaustMap((payload) =>
        this.formulationService.addFormulation(payload.formulation).pipe(
          switchMap((formulation: Formulation) => [
            fromRegisterActions.registerFormulationSucess({
              successSave: true,
            }),
          ]),
          catchError((error) => {
            return of(fromRegisterActions.registerFormulationError(error));
          })
        )
      )
    )
  );

  registerFormulationSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRegisterActions.registerFormulationSucess),
      exhaustMap((_) => {
        this._toastService.presentToastSuccess();
        this._router.navigate(["/formulation/print-report"]);
        return [clearIngredients(), clearLots()];
      }),
      catchError((error) => {
        this._toastService.presentToastError();
        return [];
      })
    )
  );
}
