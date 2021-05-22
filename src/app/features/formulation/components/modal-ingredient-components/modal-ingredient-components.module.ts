import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalIngredientComponentsComponent } from './modal-ingredient-components.component';



@NgModule({
  declarations: [ModalIngredientComponentsComponent],
  imports: [
    CommonModule
  ],
  exports:[ModalIngredientComponentsComponent]
})
export class ModalIngredientComponentsModule { }
