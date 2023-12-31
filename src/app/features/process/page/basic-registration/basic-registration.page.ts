import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DefrostDTO } from "src/app/shared/models/new-process.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { AlertService } from "src/app/shared/services/alert.service";

import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";
import {
  SELECT_BASIC_REGISTER_IS_LOADING,
  SELECT_BASIC_REGISTER_RESULT,
} from "../../store/basic-register/basic-register.select";
import { processDetailStartLoadMaterials } from "../../store/process-detail/process-detail.actions";
import { SELECT_PROCESS_DETAIL_MATERIALS } from "../../store/process-detail/process-detail.selector";


@Component({
  selector: "app-basic-registration",
  templateUrl: "./basic-registration.page.html",
  styleUrls: ["./basic-registration.page.scss"],
})
export class BasicRegistrationPage implements OnInit {
  materials$: Observable<RawMaterial[]> = this.store.select(
    SELECT_PROCESS_DETAIL_MATERIALS
  );

  title = "Informativo";

  message = "Informacion";

  buttons = ["Aceptar"];

  result: boolean;

  loading: boolean=false;

  isSelected: boolean;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.store
      .select(SELECT_BASIC_REGISTER_RESULT)
      .subscribe((tempResult) => (this.result = tempResult));

    this.store
      .select(SELECT_BASIC_REGISTER_IS_LOADING)
      .subscribe((loading) => {
        if(this.loading==false && loading==true){
        this.loading = loading;
        }else if(this.loading==true && loading==false){
          this.loading=false;
          
          this.redirectBack();
        }
      });
    
    // this.store
    //   .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
    //   .subscribe((selected) => (this.isSelected = selected));

    this.store.dispatch(processDetailStartLoadMaterials());
  }

  onSubmit(newDefrost: DefrostDTO) {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterStartRegisterNewProcess({
        newDefrost
      })
    );
  }

  onDefrost(defrost) {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterRegisterDefrostProcess({
        defrost: defrost.defrost,
        processId: defrost.processId,
      })
    );
  }

  onBackButton(form) {
    if (form.form.invalid) {
      this.redirectBack();
    } else if (form.form.valid && !this.result) {
      const buttons: any = [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Aceptar",
          handler: () => {
            form.onBack = true;
            form.form.reset();
            this.redirectBack();
          },
        },
      ];

      this.alert.showAlert(
        "Informacion",
        "",
        "No has guardado la información ingresada, ¿Seguro que quieres retroceder?",
        buttons
      );
    } else if (form.form.valid && this.result) {
      form.form.reset();
      this.redirectBack();
    }
  }

  redirectBack() {
    this.router.navigate([`/menu`]);
  }
  reprocessing() {
    this.router.navigate([`/process/reprocessing`]);
  }
}
