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
import { catalogLoadLotsError } from "src/app/features/formulation/store/catalogLots/catalogLots.actions";
import { CatalogLotsReducer } from "src/app/features/formulation/store/catalogLots/catalogLots.reducer";
import { ingredientProductRoviandaReducer } from "src/app/features/formulation/store/ingredients-product-rovianda/reducer";
import { lotsMeatReducer } from "src/app/features/formulation/store/lotsMeat/reducer";
import { lotsDriefReducer } from "src/app/features/formulation/store/lotsDrief/reducer";
import { productsRoviandaReducer } from "src/app/features/formulation/store/productsRovianda/reducer";
import { ingredientsProductRoviandaModalReducer } from "src/app/features/formulation/store/ingrediente-product-modal/reducer";
import { qualityUserReducer } from "src/app/features/formulation/store/quality-user/reducer";
import { basicRegisterReducer } from "src/app/features/process/store/basic-register/basic-register.reducer";
import { recentRecordsReducer } from "src/app/features/process/store/recent-records/recent-records.reducer";
import { processDetailReducer } from "src/app/features/process/store/process-detail/process-detail.reducer";
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
  catalogLots: CatalogLotsReducer,
  ingredientsOfProductRovianda: ingredientProductRoviandaReducer,
  lostMeat: lotsMeatReducer,
  lotsDrief: lotsDriefReducer,
  productsRovianda: productsRoviandaReducer,
  ingredientsOfProductRoviandaModal: ingredientsProductRoviandaModalReducer,
  qualityUsers: qualityUserReducer,
  basicRegister: basicRegisterReducer,
  recentRecords: recentRecordsReducer,
  processDetail: processDetailReducer,
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
