import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { loadLots } from "../../store/defrost-listing/defrost-listing.actions";
import { SELECT_DEFROST_LIST } from "../../store/defrost-listing/defrost-listing.selectors";

@Component({
  selector: "app-defrost-listing",
  templateUrl: "./defrost-listing.component.html",
  styleUrls: ["./defrost-listing.component.scss"],
})
export class DefrostListingPageComponent implements OnInit {
  loading: boolean = false;
  constructor(private store: Store<AppStateInterface>) {}

  lots$: Observable<any> = this.store.select(SELECT_DEFROST_LIST);

  ngOnInit() {
    this.store.dispatch(loadLots());
  }

  onSubmit(payload) {
    console.log(payload);
  }
}
