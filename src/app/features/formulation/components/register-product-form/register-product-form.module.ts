import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterProductFormComponent } from "./register-product-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { AddIngredientModule } from "../../dialogs/add-ingredient/add-ingredient.module";

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule,
  RouterModule,
  AddIngredientModule,
];

const COMMON_DECLARATIONS = [RegisterProductFormComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  entryComponents: [AddIngredientComponent],
  exports: COMMON_DECLARATIONS,
})
export class RegisterProductFormModule {}
