import { ProductState } from "src/app/features/formulation/store/products/products.reducer";
import { IngredientsProductState } from "src/app/features/formulation/store/ingredients-product/ingredients-product.reducer";
import { IngredientsOutletState } from "src/app/features/formulation/store/ingredients-outlet/ingredients-outlet.reducer";
import { IngredientsState } from "src/app/features/formulation/store/ingredients/ingredients.reducer";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  token?: string;
  currentToken?: string;
}

export interface AppStateInterface {
  login: LoginState;
  auth: AuthenticationUser;
  register: any;
  products: ProductState;
  ingredients: IngredientsState;
  ingredientsProduct: IngredientsProductState;
  ingredientsOutlet: IngredientsOutletState;
}
