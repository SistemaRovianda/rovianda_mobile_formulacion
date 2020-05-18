import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { Store } from "@ngrx/store";

@Component({
  selector: "register-product-form",
  templateUrl: "./register-product-form.component.html",
  styleUrls: ["./register-product-form.component.scss"],
})
export class RegisterProductFormComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _store: Store<AppStateInterface>
  ) {
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
    this.form.get("productRoviandaId").valueChanges.subscribe((productId) => {
      // this._store.dispatch
    });
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
