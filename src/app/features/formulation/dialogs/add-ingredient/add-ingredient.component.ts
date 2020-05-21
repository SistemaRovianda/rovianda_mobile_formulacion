import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Ingredient } from "src/app/shared/models/formulation.interface";
import { Observable } from "rxjs";
import {
  SELECT_INGREDIENTS_OUTLET,
  SELECT_INGREDIENTS_OUTLET_LOADING,
} from "../../store/ingredients-outlet/ingredients-outlet.selectors";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.scss"],
})
export class AddIngredientComponent implements OnInit {
  ingredientsOutlet$: Observable<Ingredient[]>;

  loading: boolean;

  constructor(private _store: Store<AppStateInterface>) {
    this.loading = true;
    this.ingredientsOutlet$ = this._store.select(SELECT_INGREDIENTS_OUTLET);
  }

  ngOnInit() {
    this._store
      .select(SELECT_INGREDIENTS_OUTLET_LOADING)
      .subscribe((loading) => (this.loading = loading));
  }
}
