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
import { Observable, from } from "rxjs";
import { ModalController } from "@ionic/angular";
import { AddIngredientComponent } from "../../dialogs/add-ingredient/add-ingredient.component";
import { Lot } from "src/app/shared/models/lot.interface";
//import { SELECT_LOTS } from "../../store/lots/lots.selectors";
import { noWhiteSpace } from "src/app/shared/validators/white-space.validator";
import { SELECT_FORMULARION_REGISTER_SAVE } from "../../store/register-formulation/register-formulation.selector";
import { registerNewRegistration } from "../../store/register-formulation/register-formulation.action";
import * as moment from "moment";
import { Storage } from "@ionic/storage";
import { productsRovianda } from "../../store/productsRovianda/reducer";
import {
  GET_ALL_PRODUCTS_ROVIANDA,
  GET_INGREDIENTS_PRODUCT_ROVIANDA,
} from "../../store/productsRovianda/actions";
import { GET_PRODUCTS_ROVIANDA_STORE } from "../../store/productsRovianda/selectors";
import { OutputsMeat } from "src/app/shared/models/outputsMeat";
import { GET_ALL_OUTPUTS_MEAT } from "../../store/lotsMeat/actions";
import { GET_LOTS_MEAT_STORE } from "../../store/lotsMeat/selector";
import { GET_ALL_QUALITY_USERS } from "../../store/quality-user/actions";
import { qualityUser } from "../../store/quality-user/reducer";
import { GET_QUALITY_USERS_STORE } from "../../store/quality-user/selectors";
import { ingredientsOfProductRovianda } from "../../store/ingredients-product-rovianda/reducer";
import { GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE } from "../../store/ingredients-product-rovianda/selector";
import { lotsDrief } from "../../store/lotsDrief/reducer";
import {
  GET_ALL_INGREDIENTS_AVAILABLES,
  SET_INGREDIENTS,
} from "../../store/ingredients-product-rovianda/actions";
import { SELECT_USER_UID } from "src/app/features/landing/store/authentication/authentication.selectors";
import { GET_LOTS_DRIEF_STORE } from "../../store/lotsDrief/selectors";

@Component({
  selector: "register-product-form",
  templateUrl: "./register-product-form.component.html",
  styleUrls: ["./register-product-form.component.scss"],
})
export class RegisterProductFormComponent implements OnInit {
  form: FormGroup;
  loadingIngredients: boolean;
  productsRovianda$: Observable<productsRovianda[]>;
  ingredientsOfProductRovianda$: Observable<ingredientsOfProductRovianda[]>;
  lotsMeat$: Observable<OutputsMeat[]>;
  lotsDrief$: Observable<lotsDrief[]>;
  lots$: Observable<Lot[]>;
  qualityUsers$: Observable<qualityUser[]>;
  nameElaborated: Observable<string>;
  uidElaborated: Observable<String>;
  lotsFormArray: FormArray = new FormArray([]);
  userId: string;
  ingredients: ingredientsOfProductRovianda[];

  selected_values = [];

  @Output("onSubmit") submit = new EventEmitter();

  customOptions: Record<string, string> = {
    header: "Selecciona uno o máx. cinco lotes",
    cssClass: "ion-select-max-height",
  };

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>,
    private _modalCtrl: ModalController,
    private _storage: Storage
  ) {
    this.loadingIngredients = true;

    //this.catalogLots$ = this._store.pipe(select(SELECT_CATALOG_LOTS));

    this.form = fb.group({
      productRoviandaId: ["", [Validators.required]],
      temperature: ["", [Validators.required, noWhiteSpace]],
      temperatureWater: ["", [Validators.required, noWhiteSpace]],
      verifitId: ["", Validators.required],
      date: [
        { value: moment(new Date()).format("DD/MM/YYYY"), disabled: true },
      ],
      makeId: [""],
      lotsDefrost: ["", [Validators.required]],
      ingredient: [[]],
    });
  }

  ngOnInit() {
    this._store.dispatch(GET_ALL_PRODUCTS_ROVIANDA());
    this._store.dispatch(GET_ALL_OUTPUTS_MEAT());
    this._store.dispatch(GET_ALL_QUALITY_USERS());
    this._store.dispatch(GET_ALL_INGREDIENTS_AVAILABLES());
    this.productsRovianda$ = this._store.pipe(
      select(GET_PRODUCTS_ROVIANDA_STORE)
    );
    this.lotsMeat$ = this._store.pipe(select(GET_LOTS_MEAT_STORE));
    this.qualityUsers$ = this._store.pipe(select(GET_QUALITY_USERS_STORE));
    this.ingredientsOfProductRovianda$ = this._store.pipe(
      select(GET_INGREDIENTS_PRODUCT_ROVIANDA_STORE)
    );
    this.lotsDrief$ = this._store.pipe(select(GET_LOTS_DRIEF_STORE));
    this.ingredientsOfProductRovianda$.subscribe((lots) => {
      this.ingredients = lots;
      this.createLotsFormArray(lots.length);
    });
    this._store.select(SELECT_FORMULARION_REGISTER_SAVE).subscribe((res) => {
      if (res) {
        this.form.reset();
        this.lotsFormArray = new FormArray([]);
        this._store.dispatch(registerNewRegistration());
        this._store.dispatch(SET_INGREDIENTS({ ingredients: [] }));
        this._store.dispatch(GET_ALL_PRODUCTS_ROVIANDA());
        this._store.dispatch(GET_ALL_OUTPUTS_MEAT());
        this._store.dispatch(GET_ALL_QUALITY_USERS());
        this._store.dispatch(GET_ALL_INGREDIENTS_AVAILABLES());
      }
    });

    // this._store
    //   .select(SELECT_INGREDIENTS_BY_PRODUCT_LOADING)
    //   .subscribe((loading) => {
    //     this.loadingIngredients = loading;
    //   });

    // this.ingredients$ = this._store.select(SELECT_INGREDIENTS_CHECKED);

    this.form.get("productRoviandaId").valueChanges.subscribe((productId) => {
      this._store.dispatch(GET_INGREDIENTS_PRODUCT_ROVIANDA({ productId }));
    });
    this._store.pipe(select(SELECT_USER_UID)).subscribe((uid) => {
      this.userId = uid;
      console.log(uid);
    });

    // //this.lots$ = this._store.select(SELECT_LOTS);
    // this.lots$.subscribe((res) => {
    //   console.log("RES",res);
    //   if (res.length) this.createLotsFormArray(res.length);
    // });

    this.nameElaborated = from(
      this._storage.get("currentUser").then((res) => Promise.resolve(res))
    );

    this._storage.get("uid").then((res) => {
      console.log("res uid", res);
      this.form.get("makeId").setValue(res);
      return Promise.resolve(res);
    });

    // this.usersVerified$ = this._store.select(usersVerifiedSelector);
  }

  onSubmit() {
    this.form
      .get("ingredient")
      .setValue(this.getLotsIdWithIngredientsId(this.lotsFormArray.value));

    // this.form.get("makeId").setValue(this.userId);

    this.form.get("lostDefrost").setValue(this.selected_values);
    const f = {
      ...this.form.value,
      date: moment(new Date()).format("DD/MM/YYYY"),
    };
    this.submit.emit(f);
  }

  getLotsIdWithIngredientsId(values: any) {
    return values.map((x, index) => {
      return {
        lotRecordId: x,
        ingredientId: this.ingredients[index].productId,
      };
    });
  }

  async openModal() {
    const modal = await this._modalCtrl.create({
      component: AddIngredientComponent,
      cssClass: "add-ingredientes-modal",
    });

    await modal.present();
  }

  createLotsFormArray(size?: number) {
    this.lotsFormArray = new FormArray([]);
    for (let i = 0; i <= size - 1; i++) {
      this.lotsFormArray.push(new FormControl("", Validators.required));
    }
  }

  get productRoviandaId() {
    return this.form.get("productRoviandaId");
  }

  get lotsDefrost() {
    return this.form.get("lotsDefrost");
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

  get verifitId() {
    return this.form.get("verifitId");
  }

  onSelect() {
    const values: [] = this.lotsDefrost.value;

    console.log(this.selected_values);

    if (this.selected_values.length <= 5) {
      this.selected_values = values.map((value:any) => {
        return {
          lotId: value.lotId,
          defrostId: value.defrostId,
        };
      });

      //do somthing
    } else {
      console.log(this.selected_values.length);
      this.lotsDefrost.setErrors({ maxLength: true });
    }
  }
}
