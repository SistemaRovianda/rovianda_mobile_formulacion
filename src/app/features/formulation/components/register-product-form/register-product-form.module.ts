import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterProductFormComponent } from "./register-product-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { AddIngredientModule } from "../../dialogs/add-ingredient/add-ingredient.module";
import { ModalSelectProcessIngredientModule } from "../modal-select-process-ingredient/modal-select-process-ingredient.module";
import { ModalSelectProcessIngredientComponent } from "../modal-select-process-ingredient/modal-select-process-ingredient.component";

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule,
  RouterModule,
  AddIngredientModule,
  ModalSelectProcessIngredientModule
];

const COMMON_DECLARATIONS = [RegisterProductFormComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  entryComponents: [AddIngredientComponent,ModalSelectProcessIngredientComponent],
  exports: COMMON_DECLARATIONS,
  
})
export class RegisterProductFormModule {}
