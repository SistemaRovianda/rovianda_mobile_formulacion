import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { SignIn } from "src/app/shared/models/user.interface";
import * as fromLoginActions from "../store/login/login.action";
import { Keyboard } from "@ionic-native/keyboard/ngx";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  openKeyboard: boolean;

  constructor(
    private keyboard: Keyboard,
    private store: Store<AppStateInterface>
  ) {
    this.openKeyboard = false;
  }

  ngOnInit() {
    window.addEventListener("keyboardWillShow", () => {
      this.openKeyboard = true;
      console.log("Keyboard will Show");
    });

    window.addEventListener("keyboardWillHide", () => {
      this.openKeyboard = false;
      console.log("Keyboard is Hidden");
    });
  }

  onLogin(payload: SignIn) {
    this.store.dispatch(fromLoginActions.signIn(payload));
  }

  recoverPassword() {
    console.log("evento recover password");
  }
}
