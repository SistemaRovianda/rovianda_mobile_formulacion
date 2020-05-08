import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";
import { AddIngredientPageComponent } from "./add-ingredient.page";

const COMMON_DECLARATIONS = [AddIngredientPageComponent];

const COMMON_IMPORTS = [CommonModule, TitleHeaderModule];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class AddIngredientPageModule {}
