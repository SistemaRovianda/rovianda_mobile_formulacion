import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Store, select } from "@ngrx/store";
import { Product } from "src/app/shared/models/product.interface";
import { Observable } from "rxjs";
import { SELECT_PRODUCTS } from "../../store/products/products.selectors";
import { loadIngredientsByProductID } from "../../store/ingredients-product/ingredients-product.actions";
import { SELECT_INGREDIENTS_BY_PRODUCT_LOADING } from "../../store/ingredients-product/ingredients-product.selectors";
import { ModalController } from "@ionic/angular";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { loadIngredientsOutlet } from "../../store/ingredients-outlet/ingredients-outlet.actions";
import { SELECT_INGREDIENTS_CHECKED } from "../../store/ingredients/ingredients.selectors";
import { IngredientC } from "src/app/shared/models/ingredient.interface";
import { Lot } from "src/app/shared/models/lot.interface";
import { SELECT_LOTS } from "../../store/lots/lots.selectors";
import { noWhiteSpace } from "src/app/shared/validators/white-space.validator";
import { textValidator } from "src/app/shared/validators/text.validator";
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

  lots$: Observable<Lot[]>;

  lotsFormArray = new FormArray([]);

  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>,
    private _modalCtrl: ModalController
  ) {
    this.loadingIngredients = true;
    this.products$ = this._store.pipe(select(SELECT_PRODUCTS));
    this.form = fb.group({
      productRoviandaId: ["", [Validators.required]],
      loteId: ["", [Validators.required, noWhiteSpace, textValidator]],
      temperature: ["", [Validators.required, noWhiteSpace, textValidator]],
      temperatureWater: ["", [Validators.required, noWhiteSpace]],
      assignmentLot: fb.group({
        newLotId: ["", [Validators.required, noWhiteSpace]],
        dateEntry: ["", [Validators.required]],
      }),
      ingredient: [[]],
    });
  }

  ngOnInit() {
    this._store
      .select(SELECT_INGREDIENTS_BY_PRODUCT_LOADING)
      .subscribe((loading) => {
        this.loadingIngredients = loading;
      });

    this.ingredients$ = this._store.select(SELECT_INGREDIENTS_CHECKED);

    this.form.get("productRoviandaId").valueChanges.subscribe((productId) => {
      this._store.dispatch(
        loadIngredientsByProductID({ productId: productId })
      );
    });

    this.lots$ = this._store.select(SELECT_LOTS);
    this.lots$.subscribe((res) => {
      if (res.length != 0) this.createLotsFormArray(res.length);
    });
  }

  onChangeDate(evt) {
    let date = evt.detail.value.split("T")[0];
    this.form.get("assignmentLot").get("dateEntry").setValue(date);
  }

  onSubmit() {
    this.form
      .get("ingredient")
      .setValue(this.getLotsIdWithIngredientsId(this.lotsFormArray.value));
    this.submit.emit(this.form.value);
  }

  getLotsIdWithIngredientsId(lotsId: number[]) {
    let arr;
    this.ingredients$.subscribe((lots) => {
      arr = lots.map((ingredient, i) => {
        return {
          lotId: lotsId[i].toString(),
          ingredientId: ingredient.ingredientId,
        };
      });
    });
    return arr;
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

  onSelect(evt) {}

  createLotsFormArray(size?: number) {
    for (let i = 0; i <= size - 1; i++) {
      this.lotsFormArray.push(new FormControl("", Validators.required));
    }
  }

  get productRoviandaId() {
    return this.form.get("productRoviandaId");
  }

  get loteId() {
    return this.form.get("loteId");
  }

  get temperature() {
    return this.form.get("temperature");
  }

  get temperatureWater() {
    return this.form.get("temperatureWater");
  }

  get newLotId() {
    return this.form.get("assignmentLot").get("newLotId");
  }

  get dateEntry() {
    return this.form.get("assignmentLot").get("dateEntry");
  }
}
