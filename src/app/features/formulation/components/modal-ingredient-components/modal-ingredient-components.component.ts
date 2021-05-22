import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { processIngredient } from 'src/app/shared/models/process.interface';

@Component({
  selector: 'app-modal-ingredient-components',
  templateUrl: './modal-ingredient-components.component.html',
  styleUrls: ['./modal-ingredient-components.component.scss'],
})
export class ModalIngredientComponentsComponent implements OnInit {

  @Input("ingredients") ingredients:processIngredient;

  constructor(private modalController:ModalController) {
  }

  ngOnInit() {}


}
