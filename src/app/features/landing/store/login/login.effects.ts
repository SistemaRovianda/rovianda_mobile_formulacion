import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { forkJoin, from, of } from "rxjs";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import * as fromLoginActions from "./login.action";
import { AuthService } from "src/app/shared/Services/auth.service";

@Injectable()
export class LogginEffects {
  constructor(
    private action$: Actions,
    private auth: AuthService,
    private router: Router
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      delay(2000),
      exhaustMap((action) => {
        return forkJoin(
          this.auth.signIn(action.email, action.password),
          this.auth.getTokenCurrentUser()
        ).pipe(
          switchMap(([{ uid }]) => {
            return [
              fromLoginActions.startLoad(),
              fromLoginActions.signAuthSuccess({ uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        );
      })
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.auth.getUserData(action.uid).pipe(
          delay(3000),
          switchMap(() => [fromLoginActions.signInSuccess()]),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        )
      )
    )
  );

  signInSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signInSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/menu"])).pipe(
          switchMap((result) =>
            result
              ? [fromLoginActions.finishLoad()]
              : [fromLoginActions.signInFailure({ error: "Usuario no valido" })]
          ),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure(error)
            )
          )
        )
      )
    )
  );
}
