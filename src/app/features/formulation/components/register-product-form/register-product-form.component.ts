import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Store, select } from "@ngrx/store";
import { Product } from "src/app/shared/models/product.interface";
import { Observable } from "rxjs";
import { SELECT_PRODUCTS } from "../../store/products/products.selectors";
import { loadIngredientsByProductID } from "../../store/ingredients-product/ingredients-product.actions";
import {
  SELECT_INGREDIENTS_BY_PRODUCT_LOADING,
  SELECT_INGREDIENTS_BY_PRODUCT,
} from "../../store/ingredients-product/ingredients-product.selectors";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import { ModalController } from "@ionic/angular";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { loadIngredientsOutlet } from "../../store/ingredients-outlet/ingredients-outlet.actions";
import { SELECT_INGREDIENTS } from "../../store/ingredients/ingredients.selectors";
import {
  IngredientC,
  IngredientP,
} from "src/app/shared/models/ingredient.interface";

const NAME_COMPONENT = "register-product-form";
@Component({
  selector: "register-product-form",
  templateUrl: "./register-product-form.component.html",
  styleUrls: ["./register-product-form.component.scss"],
})
export class RegisterProductFormComponent implements OnInit {
  form: FormGroup;

  loadingIngredients: boolean;

  products$: Observable<Product[]>;

  ingredients$: Observable<IngredientC[]>;

  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>,
    private _modalCtrl: ModalController
  ) {
    this.loadingIngredients = true;
    this.products$ = this._store.pipe(select(SELECT_PRODUCTS));
    this.form = fb.group({
      productRoviandaId: ["", Validators.required],
      loteId: ["", Validators.required],
      temperature: [""],
      temperatureWater: [""],
      assigmentLot: fb.group({
        newLotId: [""],
        dateEntry: ["", Validators.required],
      }),
      ingredient: [[]],
    });
  }

  ngOnInit() {
    this._store
      .select(SELECT_INGREDIENTS_BY_PRODUCT_LOADING)
      .subscribe((loading) => {
        console.log(`[${NAME_COMPONENT}] loading: `, loading);
        this.loadingIngredients = loading;
      });

    this.ingredients$ = this._store.select(SELECT_INGREDIENTS);

    this.form.get("productRoviandaId").valueChanges.subscribe((productId) => {
      console.log(`[${NAME_COMPONENT}] productId: `, productId);
      this._store.dispatch(
        loadIngredientsByProductID({ productId: productId })
      );
    });
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }

  async openModal() {
    let ingredientsC: IngredientC[];
    this.ingredients$.subscribe((res) => (ingredientsC = res));
    await this._store.dispatch(
      loadIngredientsOutlet({ ingredientsProductIn: ingredientsC })
    );
    const modal = await this._modalCtrl.create({
      component: AddIngredientComponent,
    });

    await modal.present();
  }
}
