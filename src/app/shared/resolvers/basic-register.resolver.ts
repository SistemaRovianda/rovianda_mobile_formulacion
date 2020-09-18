import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "src/app/features/process/store/recent-records/recent-records.selector";
import { AppStateInterface } from "../models/storeState.interface";

@Injectable()
export class BasicRegisterResolver implements Resolve<boolean> {
  isSelected: boolean;
  constructor(private store: Store<AppStateInterface>) {
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isSelected) {
    }
    return true;
  }
}
