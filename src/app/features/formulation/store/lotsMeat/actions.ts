import { createAction, props } from '@ngrx/store';
import { OutputsMeat } from 'src/app/shared/models/outputsMeat';

export const GET_ALL_OUTPUTS_MEAT = createAction("[OUTPUTS_MEAT], getting all outputsMeat");
export const SET_OUTPUTS_MEAT = createAction("[OUTPUTS_MEAT], setting all outputsMeat",props<{outputsMeat:OutputsMeat[]}>());