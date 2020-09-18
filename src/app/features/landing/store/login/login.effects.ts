import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { Storage } from "@ionic/storage";
import { catchError, delay, exhaustMap, switchMap, tap } from "rxjs/operators";
import * as fromLoginActions from "./login.action";
import { AuthService } from "src/app/shared/Services/auth.service";
import * as fromAuthenticationUser from "../authentication/authentication.action";
import { clearIngredients } from "src/app/features/formulation/store/ingredients/ingredients.actions";
import { clearLots } from "src/app/features/formulation/store/lots/lots.actions";

@Injectable()
export class LogginEffects {
  constructor(
    private action$: Actions,
    private _storage: Storage,
    private authService: AuthService,
    private router: Router
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      delay(2000),
      exhaustMap((action) =>
        this.authService.signIn(action.email, action.password).pipe(
          switchMap(({ uid, token }) => {
            this._storage.set("uid", uid);
            return [
              fromLoginActions.startLoad(),
              fromAuthenticationUser.loadUser({
                uid,
                token,
              }),
              fromAuthenticationUser.loadCurrentToken({ uid: uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  loadCurrentTokenUserEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthenticationUser.loadCurrentToken),
      exhaustMap((action) =>
        this.authService.getTokenCurrentUser().pipe(
          switchMap(({ currentToken }) => {
            this._storage.set("token", currentToken);
            return [
              fromAuthenticationUser.loadUser({ currentToken }),
              fromLoginActions.signAuthSuccess({ uid: action.uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.error })
            )
          )
        )
      )
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.authService.getUserData(action.uid).pipe(
          switchMap(({ email, name, firstSurname, lastSurname, rol }) => {
            this._storage.set("role", rol);
            this._storage.set(
              "currentUser",
              name + " " + firstSurname + " " + lastSurname
            );
            return [
              fromAuthenticationUser.loadUser({
                email,
                name,
                firstSurname,
                lastSurname,
                rol,
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

  signInFailureEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromLoginActions.signInFailure),
        tap((action) => localStorage.clear())
      ),
    {
      dispatch: false,
    }
  );

  signOutEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signOut),
      exhaustMap((action) =>
        this.authService.signOut().pipe(
          switchMap((action) => [
            fromAuthenticationUser.clearUser(),
            clearIngredients(),
            clearLots(),
          ]),
          catchError((error) => of(fromLoginActions.signInFailure(error)))
        )
      )
    )
  );
}
