import { LogginEffects } from "src/app/features/landing/store/login/login.effects";
import { RegisterFormulationEffects } from "src/app/features/formulation/store/register-formulation/register-formulation.effects";
import { ProductsEffects } from "src/app/features/formulation/store/products/products.effects";
import { IngredientsProductEffects } from "src/app/features/formulation/store/ingredients-product/ingredients-product.effects";
import { IngredientsOutletEffects } from "src/app/features/formulation/store/ingredients-outlet/ingredients-outlet.effects";
import { IngredientsEffects } from "src/app/features/formulation/store/ingredients/ingredients.effects";
import { LotsEffects } from "src/app/features/formulation/store/lots/lots.effects";

export const effects = [
  LogginEffects,
  RegisterFormulationEffects,
  ProductsEffects,
  IngredientsEffects,
  IngredientsProductEffects,
  IngredientsOutletEffects,
  LotsEffects,
];
