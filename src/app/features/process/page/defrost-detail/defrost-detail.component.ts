import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { defrostDetail } from "src/app/shared/models/defrost.interface";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { detailLot } from "../../store/defrost-detail/defrost-detail.actions";
import { SELECT_DEFROST_DETAIL } from "../../store/defrost-detail/defrost-detail.selectors";
import { defrost } from "../../store/defrost/defrost.actions";
import { SELECT_ISLOADING } from "../../store/defrost/defrost.selector";

@Component({
  selector: "app-defrost-detail",
  templateUrl: "./defrost-detail.component.html",
  styleUrls: ["./defrost-detail.component.scss"],
})
export class DefrostDetailPageComponent implements OnInit {
  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  lots$: Observable<defrostDetail>;
  loading$: Observable<boolean> = this.store.select(SELECT_ISLOADING);

  ngOnInit() {
    this.store.dispatch(detailLot({ lot: this.id }));
    this.lots$ = this.store.select(SELECT_DEFROST_DETAIL).pipe(map((v) => v));
  }

  onSubmit(payload) {
    this.store.dispatch(defrost({ lot: this.id, body: payload }));
    console.log(payload);
  }

  get id(): number {
    return parseInt(this.route.snapshot.paramMap.get("id"));
  }
}
