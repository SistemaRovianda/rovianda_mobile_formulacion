import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, switchMap, tap, delay } from "rxjs/operators";
import { Formulation } from "src/app/shared/models/formulation.interface";
import { FormulationService } from "src/app/shared/services/formulation.service";
import * as fromRegisterActions from "./register-formulation.action";

@Injectable({
  providedIn: "root",
})
export class RegisterFormulationEffects {
  constructor(
    private actions$: Actions,
    private formulationService: FormulationService
  ) {}

  addFormulation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRegisterActions.register),
      delay(2000),
      exhaustMap((payload) =>
        this.formulationService.addFormulation(payload.formulation).pipe(
          switchMap((formulation: Formulation) => [
            fromRegisterActions.registerSucess({ formulation }),
          ]),
          catchError((error) => {
            return of(fromRegisterActions.registerError(error));
          })
        )
      )
    )
  );
}
