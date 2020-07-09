import { createAction, props } from "@ngrx/store";
import { UserVerified } from "src/app/shared/models/user.interface";

const LOAD_USERS = "[Users] Load Users";

const LOAD_USERS_SUCCESS = "[Users] Load Users Success";

const LOAD_USERS_ERROR = "[Users] Load Users Error";

export const loadUsers = createAction(LOAD_USERS);

export const loadUsersSuccess = createAction(
  LOAD_USERS_SUCCESS,
  props<{ usersVerified: UserVerified[] }>()
);

export const loadUsersError = createAction(
  LOAD_USERS_ERROR,
  props<{ error: string }>()
);
