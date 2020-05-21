import { NgModule } from "@angular/core";
import { AddIngredientComponent } from "./add-ingredient.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

const DECLARATIONS = [AddIngredientComponent];

const IMPORTS = [CommonModule, IonicModule];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  exports: DECLARATIONS,
})
export class AddIngredientModule {}
