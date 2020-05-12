import { Component, OnInit } from "@angular/core";
import { Formulation } from "src/app/shared/models/formulation.interface";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import * as fromRegister from "../../store/register-formulation/register-formulation.action";

@Component({
  selector: "register-product",
  templateUrl: "./register-product.page.html",
  styleUrls: ["./register-product.page.scss"],
})
export class RegisterProductPageComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {}

  onSubmit(formulation: Formulation) {
    console.log(formulation);
    this.store.dispatch(fromRegister.register({ formulation }));
  }
}
