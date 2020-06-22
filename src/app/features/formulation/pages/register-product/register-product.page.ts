import { Component, OnInit } from "@angular/core";
import { Formulation } from "src/app/shared/models/formulation.interface";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import * as fromRegister from "../../store/register-formulation/register-formulation.action";
import { AlertController } from "@ionic/angular";
import { SELECT_REGISTER_FORMULATION_LOADING } from "../../store/register-formulation/register-formulation.selector";
import { Router } from "@angular/router";
import { log } from "console";
import { signOut } from "src/app/features/landing/store/login/login.action";

@Component({
  selector: "register-product",
  templateUrl: "./register-product.page.html",
  styleUrls: ["./register-product.page.scss"],
})
export class RegisterProductPageComponent implements OnInit {
  loadingSave: boolean;

  constructor(
    private store: Store<AppStateInterface>,
    private _alertCtrl: AlertController,
    private _router: Router
  ) {
    this.loadingSave = false;
  }

  ngOnInit() {
    console.log("Entra a formulacion form");
    this.store
      .select(SELECT_REGISTER_FORMULATION_LOADING)
      .subscribe((res) => (this.loadingSave = res));
  }

  onSubmit(formulation: Formulation) {
    this.openModal(formulation);
  }

  async openModal(formulation: Formulation) {
    const alert = await this._alertCtrl.create({
      header: "Guardar formula",
      message: "Una vez que genere el reporte este no podrá ser modificado.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          cssClass: "btn-confirm-dialog",
          handler: () => {
            this.store.dispatch(
              fromRegister.registerFormulation({ formulation })
            );
            // this._router.navigate(["/formulation/print-report"]);
          },
        },
      ],
    });
    (await alert).present();
  }

  logout() {
    this.store.dispatch(signOut());
  }
}
