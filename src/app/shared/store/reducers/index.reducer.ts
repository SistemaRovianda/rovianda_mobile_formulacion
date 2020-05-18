import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { AppStateInterface } from "../../models/storeState.interface";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { registerFormulationReducer } from "src/app/features/formulation/store/register-formulation/register-formulation.reducer";
import { productsReducer } from "src/app/features/formulation/store/products/products.reducer";
export const reducers: ActionReducerMap<AppStateInterface> = {
  login: loginReducer,
  auth: authenticationReducer,
  register: registerFormulationReducer,
  products: productsReducer,
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
