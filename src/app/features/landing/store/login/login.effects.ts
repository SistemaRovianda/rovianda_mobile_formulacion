import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { forkJoin, from, of } from "rxjs";
import { catchError, delay, exhaustMap, switchMap } from "rxjs/operators";
import * as fromLoginActions from "./login.action";
import { AuthService } from "src/app/shared/Services/auth.service";
import * as fromAuthenticationUser from "../authentication/authentication.action";

@Injectable()
export class LogginEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      delay(2000),
      exhaustMap((action) => {
        return forkJoin(
          this.authService.signIn(action.email, action.password),
          this.authService.getTokenCurrentUser()
        ).pipe(
          switchMap(([{ uid, token }]) => {
            return [
              fromLoginActions.startLoad(),
              fromLoginActions.signAuthSuccess({ id: uid, token: token }),
              fromAuthenticationUser.loadCurrentToken({ uid: uid }),
              fromAuthenticationUser.loadUser({
                token,
              }),
              fromLoginActions.signInSuccess(),
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

  // signAuthSuccessEffect$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(fromLoginActions.signAuthSuccess),
  //     exhaustMap((action) =>
  //       this.authService.getUserData(action.id).pipe(
  //         switchMap(({ id, email, ingenioid, rol, token }) => [
  //           fromAuthenticationUser.loadUser({
  //             id,
  //             email,
  //             ingenioid,
  //             rol,
  //             token,
  //           }),
  //           fromLoginActions.signInSuccess(),
  //         ]),
  //         catchError((error) =>
  //           of(
  //             fromLoginActions.finishLoad(),
  //             fromLoginActions.signInFailure(error)
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  signInSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signInSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/formulation/register-product"])).pipe(
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
