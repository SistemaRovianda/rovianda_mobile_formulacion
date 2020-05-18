import { NgModule } from '@angular/core';
import { AddIngredientComponent } from './add-ingredient.component';
import { CommonModule } from '@angular/common';

const DECLARATIONS = [AddIngredientComponent];

const IMPORTS = [CommonModule];

@NgModule({
    declarations: DECLARATIONS,
    imports: IMPORTS,
    exports: DECLARATIONS
})

export class AddIngredient {

}