import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Observable } from "rxjs";
import {
  SELECT_INGREDIENTS,
  SELECT_INGREDIENTS_LOADING,
} from "../../store/ingredients/ingredients.selectors";
import { IngredientC } from "src/app/shared/models/ingredient.interface";
import { FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import { updateIngredients } from "../../store/ingredients/ingredients.actions";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.scss"],
})
export class AddIngredientComponent implements OnInit {
  ingredientsOutlet$: Observable<IngredientC[]>;

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
    this._store
      .select(SELECT_INGREDIENTS_LOADING)
      .subscribe((loading) => (this.loading = loading));
  }

  ingredients: IngredientC[];

  ngOnInit() {
    this.ingredientsOutlet$ = this._store.select(SELECT_INGREDIENTS);
    this.ingredientsOutlet$.subscribe((res) => {
      this.ingredients = res;
      this.createIngredientsForm();
    });
  }

  createIngredientsForm() {
    this.ingredientsForm = this._fb.group({
      ingredients: this.createIngredients(this.ingredients),
    });
  }

  createIngredients(ingredients: IngredientC[]): FormArray {
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
    let arr = Object.assign(
      {},
      {
        ingredients: formValue.ingredients.map((value, i) => {
          return {
            ingredientId: this.ingredients[i].ingredientId,
            description: this.ingredients[i].description,
            checked: value,
          };
        }),
      }
    );
    return Object.keys(arr.ingredients).map((e, i) => arr.ingredients[i]);
  }

  addIngredients(formValue) {
    if (this.notSelected(this.getSelected(formValue))) {
      this.showError = false;
      this._store.dispatch(
        updateIngredients({ ingredients: this.getSelected(formValue) })
      );
      this._modalCtrl.dismiss();
    } else {
      this.showError = true;
    }
  }

  notSelected(arrChecked: IngredientC[]) {
    return arrChecked.filter((ing) => ing.checked).length != 0 ? true : false;
  }

  onCancel() {
    this._modalCtrl.dismiss();
  }
}
