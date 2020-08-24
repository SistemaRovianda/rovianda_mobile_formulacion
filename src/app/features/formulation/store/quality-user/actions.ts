import { createAction, props } from '@ngrx/store';
import { qualityUser } from './reducer';

export const GET_ALL_QUALITY_USERS = createAction("[QUALITY USERS], getting quality users");
export const SET_ALL_QUALITY_USERS = createAction("[QUALITY USERS], getting quality users",props<{users:qualityUser[]}>());