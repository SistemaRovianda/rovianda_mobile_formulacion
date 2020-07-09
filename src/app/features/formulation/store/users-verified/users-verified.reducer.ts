import { UserVerified } from "src/app/shared/models/user.interface";
import { createReducer, on, Action } from "@ngrx/store";
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} from "./users-verified.actions";

export interface UsersVerifiedState {
  loading: boolean;
  usersVerified: UserVerified[];
  error: string;
}

const initialState: UsersVerifiedState = {
  loading: false,
  usersVerified: [],
  error: null,
};

const _usersVerifiedReducer = createReducer<UsersVerifiedState>(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadUsersSuccess, (state, { usersVerified }) => ({
    ...state,
    loading: false,
    usersVerified,
  })),
  on(loadUsersError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function usersVerifiedReducer(
  state: UsersVerifiedState,
  action: Action
) {
  return _usersVerifiedReducer(state, action);
}
