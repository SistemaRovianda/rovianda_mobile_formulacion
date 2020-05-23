import { NgModule } from "@angular/core";
import { AddIngredientComponent } from "./add-ingredient.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const DECLARATIONS = [AddIngredientComponent];

const IMPORTS = [CommonModule, IonicModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  exports: DECLARATIONS,
})
export class AddIngredientModule {}
