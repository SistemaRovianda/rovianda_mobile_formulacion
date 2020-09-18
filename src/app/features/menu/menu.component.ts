import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { signOut } from "../landing/store/login/login.action";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(signOut());
  }
}
