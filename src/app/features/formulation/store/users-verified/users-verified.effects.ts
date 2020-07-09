import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersVerifiedService } from "src/app/shared/services/users-verified.service";
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} from "./users-verified.actions";
import { exhaustMap, catchError, switchMap } from "rxjs/operators";
import { usersVerifiedReducer } from "./users-verified.reducer";
import { of } from "rxjs";
import { UserVerified } from "src/app/shared/models/user.interface";

@Injectable({
  providedIn: "root",
})
export class UsersVerifiedEffects {
  constructor(
    private action$: Actions,
    private usersVerifiedService: UsersVerifiedService
  ) {}

  loadUsersVerifiedEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUsers),
      exhaustMap((_) =>
        this.usersVerifiedService.getUsersVerified().pipe(
          switchMap((usersVerified: UserVerified[]) => [
            loadUsersSuccess({ usersVerified: usersVerified }),
          ]),
          catchError((error) => of(loadUsersError({ error: error })))
        )
      )
    )
  );
}
