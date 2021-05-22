import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { processIngredient } from 'src/app/shared/models/process.interface';
import { AppStateInterface } from 'src/app/shared/models/storeState.interface';
import { deleteProcessIngredients, getProcessIngredients } from '../../store/ingredients/ingredients.actions';
import { isDeletingIngredients } from '../../store/ingredients/ingredients.selectors';
import { ModalIngredientComponentsComponent } from '../modal-ingredient-components/modal-ingredient-components.component';


@Component({
  selector: 'app-modal-select-process-ingredient',
  templateUrl: './modal-select-process-ingredient.component.html',
  styleUrls: ['./modal-select-process-ingredient.component.scss'],
})
export class ModalSelectProcessIngredientComponent implements OnInit {

  
  @Input("processIngredients") processIngredients:processIngredient[];

  @Input("productId") productId:number;


  isDeleting=false;
  constructor(private modalRef:ModalController,private _store: Store<AppStateInterface>,public loadingController:LoadingController) { 
    this.subscription=new Subscription();
    this.subscription.add(this._store.select(isDeletingIngredients).subscribe((isDeleting)=>{
        if(this.isDeleting==true && isDeleting==false){
          this.isDeleting=false;
          this._store.dispatch(getProcessIngredients({productId:this.productId}));
          this.modalRef.dismiss([]);
        }else{
        this.isDeleting=isDeleting;
        }
    }));
  }

  subscription:Subscription;


  ngOnInit() {
    console.log("product rovianda Id: "+this.productId);
  }

  closeAndAdd(){
    this.modalRef.dismiss(this.processIngredients);
  }
  cancel(){
    this.modalRef.dismiss([]);
  }

  async delete(index:number){
    let processId=this.processIngredients[index].processId;
    this._store.dispatch(deleteProcessIngredients({processId}));
    const loading = await this.loadingController.create({
      message: 'Removiendo de la lista, por favor espere...',
      duration: 5000
    });
    await loading.present();

  }

  add(index:number){
    this.processIngredients[index].assigned=true;
  }
  remove(index:number){
    this.processIngredients[index].assigned=false;
  }

  async showInfo(index:number){
    const modal = await this.modalRef.create({
      component:ModalIngredientComponentsComponent,
      componentProps:{
        ingredients: this.processIngredients[index]
      }
    }); 
    modal.present();
  }
}
