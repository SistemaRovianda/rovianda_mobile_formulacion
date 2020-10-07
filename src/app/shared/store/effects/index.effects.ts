import { CatalogLotsEffects } from "src/app/features/formulation/store/catalogLots/catalogLots.effects";
import { IngredientsOutletEffects } from "src/app/features/formulation/store/ingredients-outlet/ingredients-outlet.effects";
import { IngredientProductRoviandaEffects } from "src/app/features/formulation/store/ingredients-product-rovianda/effects";
import { IngredientsProductEffects } from "src/app/features/formulation/store/ingredients-product/ingredients-product.effects";
import { IngredientsEffects } from "src/app/features/formulation/store/ingredients/ingredients.effects";
import { LotsEffects } from "src/app/features/formulation/store/lots/lots.effects";
import { LotsMeatEffects } from "src/app/features/formulation/store/lotsMeat/effects";
import { ProductsEffects } from "src/app/features/formulation/store/products/products.effects";
import { productRoviandaEffects } from "src/app/features/formulation/store/productsRovianda/effects";
import { QualityUsersEffects } from "src/app/features/formulation/store/quality-user/effects";
import { RegisterFormulationEffects } from "src/app/features/formulation/store/register-formulation/register-formulation.effects";
import { UsersVerifiedEffects } from "src/app/features/formulation/store/users-verified/users-verified.effects";
import { LogginEffects } from "src/app/features/landing/store/login/login.effects";
import { BasicRegisterEffect } from "src/app/features/process/store/basic-register/basic-register.effects";
import { defrostDetailEffects } from "src/app/features/process/store/defrost-detail/defrost-detail.effects";
import { defrostListingEffects } from "src/app/features/process/store/defrost-listing/defrost-listing.effects";
import { defrostUpdateEffects } from "src/app/features/process/store/defrost/defrost.effects";
import { ProcessDetailEffect } from "src/app/features/process/store/process-detail/process-detail.effects";
import { RecentRecordsEffects } from "src/app/features/process/store/recent-records/recent-records.effects";

export const effects = [
  LogginEffects,
  RegisterFormulationEffects,
  ProductsEffects,
  IngredientsEffects,
  IngredientsProductEffects,
  IngredientsOutletEffects,
  LotsEffects,
  UsersVerifiedEffects,
  CatalogLotsEffects,
  productRoviandaEffects,
  LotsMeatEffects,
  IngredientProductRoviandaEffects,
  QualityUsersEffects,
  BasicRegisterEffect,
  RecentRecordsEffects,
  ProcessDetailEffect,
  defrostListingEffects,
  defrostDetailEffects,
  defrostUpdateEffects,
];
