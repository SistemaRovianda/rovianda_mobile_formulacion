import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { SignIn } from "src/app/shared/models/user.interface";
import * as fromLoginActions from "../store/login/login.action";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {}

  onLogin(payload: SignIn) {
    this.store.dispatch(fromLoginActions.signIn(payload));
  }

  recoverPassword() {
    console.log("evento recover password");
  }
}
