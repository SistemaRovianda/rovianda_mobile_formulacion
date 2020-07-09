import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { AppStateInterface } from "../../models/storeState.interface";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { registerFormulationReducer } from "src/app/features/formulation/store/register-formulation/register-formulation.reducer";
import { productsReducer } from "src/app/features/formulation/store/products/products.reducer";
import { ingredientsOutletReducer } from "src/app/features/formulation/store/ingredients-outlet/ingredients-outlet.reducer";
import { ingredientsProductReducer } from "src/app/features/formulation/store/ingredients-product/ingredients-product.reducer";
import { ingredientsReducer } from "src/app/features/formulation/store/ingredients/ingredients.reducer";
import { lotsReducer } from "src/app/features/formulation/store/lots/lots.reducer";
import { usersVerifiedReducer } from "src/app/features/formulation/store/users-verified/users-verified.reducer";
export const reducers: ActionReducerMap<AppStateInterface> = {
  login: loginReducer,
  auth: authenticationReducer,
  register: registerFormulationReducer,
  products: productsReducer,
  ingredientsProduct: ingredientsProductReducer,
  ingredientsOutlet: ingredientsOutletReducer,
  ingredients: ingredientsReducer,
  lots: lotsReducer,
  usersVerified: usersVerifiedReducer,
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
