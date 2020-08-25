import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Observable } from "rxjs";
import { IngredientC } from "src/app/shared/models/ingredient.interface";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { updateIngredients } from "../../store/ingredients/ingredients.actions";
import { ModalController } from "@ionic/angular";
import { ingredientsOfProductRoviandaModal } from '../../store/ingrediente-product-modal/reducer';
import {  GET_INGREDIENTS_AVAILABLES_STORE } from '../../store/ingrediente-product-modal/selectors';
import { ingredientsOfProductRovianda } from '../../store/ingredients-product-rovianda/reducer';
import { UPDATE_INGREDIENTS_DEL_BY_ID, SET_INGREDIENTS } from '../../store/ingredients-product-rovianda/actions';
import { GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE } from '../../store/ingredients-product-rovianda/selector';

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.scss"],
})
export class AddIngredientComponent implements OnInit {
  ingredientsToModal$: ingredientsOfProductRoviandaModal[];
  ingredientsToUpdate:number[];
  ingredientsForm: FormGroup;

  loading: boolean;

  showError: boolean;

  ingredientsNull: boolean;

  constructor(
    private _store: Store<AppStateInterface>,
    private _fb: FormBuilder,
    private _modalCtrl: ModalController
  ) {
    this.ingredientsNull = false;
    this.showError = false;
    this.loading = true;
    
  }

  ingredients: ingredientsOfProductRovianda[];

  ngOnInit() {
    this.ingredientsToModal$=[];
    this._store.select(GET_INGREDIENTS_AVAILABLES_STORE).subscribe((ingredientsToModal)=>{ // obtiene todos los ingrediente secos del catalogo
      this.ingredientsToModal$=ingredientsToModal;
      console.log("FOR MODAL",this.ingredientsToModal$);
      this._store.select(GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE).subscribe((ingredientsOfFormule)=>{ // obtiene los ingredientes para la formula
        this.ingredientsToUpdate=ingredientsOfFormule.map(x=>x.productId);
        console.log("INGREDIENTES UPDATES",this.ingredientsToUpdate);
        let productsMoldal = this.ingredientsToModal$.map(x=>x.productId);
        ingredientsOfFormule.forEach((ingredient)=>{
          if(!productsMoldal.includes(ingredient.productId)){
            this.ingredientsToModal$.push({
              productId: ingredient.productId,
              description: ingredient.description,
              original: ingredient.original,
              checked: false
            });
          }
        })
        this.ingredientsToModal$=this.ingredientsToModal$.map(x=>{ 
          if(this.ingredientsToUpdate.includes(x.productId))
          {
            return {...x,checked:true}
          }else{
            return {...x,checked:false}
          }
        })
        this.ingredientsForm = this._fb.group({
          ingredients: this.createIngredients(this.ingredientsToModal$),
        });
      });
      
    })
    
  }

  createIngredients(ingredients:ingredientsOfProductRoviandaModal[]): FormArray {
    if (ingredients.length != 0) {
      this.ingredientsNull = false;
      const arrIngredients = ingredients.map(
        (ingredient) => new FormControl(ingredient.checked || false)
      );
      return new FormArray(arrIngredients);
    }
    this.ingredientsNull = true;
    return new FormArray([]);
  }

  getSelected(formValue) {
    
    let idsToDelete:number[]=[];
      this.ingredients= formValue.ingredients.map((value, i) => {
        console.log("VALUE",value);
        if(value as boolean == false){
          idsToDelete.push(this.ingredientsToModal$[i].productId);
        }
        })
      
    this._store.dispatch(UPDATE_INGREDIENTS_DEL_BY_ID({ids:[...idsToDelete]}));
    idsToDelete=[];
    //return Object.keys(arr.ingredients).map((e, i) => arr.ingredients[i]);
  }

  addIngredients(formValue) {
    this.getSelected(formValue);

    let ingredientsToAdd:ingredientsOfProductRovianda[] = this.ingredientsToModal$.filter((x,index)=>formValue["ingredients"][index]==true).map(x=>{
      return {
          productId:x.productId,
          description:x.description,
          original:true
      }
    });
    
    this._store.dispatch(
      SET_INGREDIENTS({ ingredients:[...ingredientsToAdd]})
    );
      // this.showError = false;
      // this._store.dispatch(
      //   UPDATE_INGREDIENTS_DEL_BY_ID({ids:this.getSelected(formValue)})
      //   //updateIngredients({ ingredients: this.getSelected(formValue) })
      // );
      this._modalCtrl.dismiss();
    // } else {
    //   this.showError = true;
    // }
  }

  notSelected(arrChecked: IngredientC[]) {
    return arrChecked.filter((ing) => ing.checked).length != 0 ? true : false;
  }

  onCancel() {
    this._modalCtrl.dismiss();
  }
}
