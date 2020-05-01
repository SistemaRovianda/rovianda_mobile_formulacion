import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { AppStateInterface } from "../../models/storeState.interface";
export const reducers: ActionReducerMap<AppStateInterface> = {
  login: loginReducer,
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
