import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterProductPageComponent } from "./register-product.page";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { RegisterProductFormModule } from "../../components/register-product-form/register-product-form.module";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";

const COMMON_IMPORTS = [
  CommonModule,
  RouterModule,
  IonicModule,
  RegisterProductFormModule,
  TitleHeaderModule,
];

const COMMON_DECLARATIONS = [RegisterProductPageComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class RegisterProductPageModule {}
