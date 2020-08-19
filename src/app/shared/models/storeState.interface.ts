import { ProductState } from "src/app/features/formulation/store/products/products.reducer";
import { IngredientsProductState } from "src/app/features/formulation/store/ingredients-product/ingredients-product.reducer";
import { IngredientsOutletState } from "src/app/features/formulation/store/ingredients-outlet/ingredients-outlet.reducer";
import { IngredientsState } from "src/app/features/formulation/store/ingredients/ingredients.reducer";
import { LotsState } from "src/app/features/formulation/store/lots/lots.reducer";
import { RegisterFormulationState } from "src/app/features/formulation/store/register-formulation/register-formulation.reducer";
import { UsersVerifiedState } from "src/app/features/formulation/store/users-verified/users-verified.reducer";
import { CatalogLotsState } from "src/app/features/formulation/store/catalogLots/catalogLots.reducer";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  firstSurname?: string;
  lastSurname?: string;
  email?: string;
  rol?: string;
  token?: string;
  currentToken?: string;
}

export interface AppStateInterface {
  login: LoginState;
  auth: AuthenticationUser;
  register: RegisterFormulationState;
  products: ProductState;
  ingredients: IngredientsState;
  ingredientsProduct: IngredientsProductState;
  ingredientsOutlet: IngredientsOutletState;
  lots: LotsState;
  usersVerified: UsersVerifiedState;
  catalogLots: CatalogLotsState;
}
