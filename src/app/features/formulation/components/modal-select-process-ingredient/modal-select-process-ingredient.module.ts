import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectProcessIngredientComponent } from './modal-select-process-ingredient.component';
import { IonicModule } from '@ionic/angular';
import { ModalIngredientComponentsModule } from '../modal-ingredient-components/modal-ingredient-components.module';
import { ModalIngredientComponentsComponent } from '../modal-ingredient-components/modal-ingredient-components.component';



@NgModule({
  declarations: [ModalSelectProcessIngredientComponent],
  imports: [
    CommonModule,IonicModule,
    ModalIngredientComponentsModule
  ],
  exports:[ModalSelectProcessIngredientComponent],
  entryComponents:[ModalIngredientComponentsComponent]
})
export class ModalSelectProcessIngredientModule { }
