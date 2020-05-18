import { LogginEffects } from "src/app/features/landing/store/login/login.effects";
import { RegisterFormulationEffects } from "src/app/features/formulation/store/register-formulation/register-formulation.effects";
import { ProductsEffects } from "src/app/features/formulation/store/products/products.effects";

export const effects = [
  LogginEffects,
  RegisterFormulationEffects,
  ProductsEffects,
];
