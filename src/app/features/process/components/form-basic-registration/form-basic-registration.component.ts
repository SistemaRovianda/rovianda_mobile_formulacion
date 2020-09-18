import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as moment from "moment";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { Process } from "src/app/shared/models/process.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import { AlertService } from "src/app/shared/services/alert.service";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import {
  basicRegisterSearchInformation,
  basicRegisterSelectMaterial,
} from "../../store/basic-register/basic-register.actions";
import {
  SELECT_BASIC_REGISTER_LOTS,
  SELECT_CURRENT_PROCESS,
} from "../../store/basic-register/basic-register.select";
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";

@Component({
  selector: "app-form-basic-registration",
  templateUrl: "./form-basic-registration.component.html",
  styleUrls: ["./form-basic-registration.component.scss"],
})
export class FormBasicRegistrationComponent implements OnInit {
  form: FormGroup;

  @Input() materials: RawMaterial[];

  lots: LotMeatOutput[];

  @Output("onSubmit") submit = new EventEmitter();

  @Output("onDefrost") defrost = new EventEmitter();

  isSelected: boolean;

  emptyProcess = false;

  datesRegistered = false;

  process: Process;

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  result: boolean;

  onBack = false;

  isNewRegister: boolean;

  section: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      lotId: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      temperature: ["", Validators.required],
      hourEntrance: [new Date().toISOString(), Validators.required],
      hourExit: [],
      dateIni: [this.minDate, Validators.required],
      dateFinal: [""],
    });
  }

  ngOnInit() {
    this.store.dispatch(
      basicRegisterSearchInformation({
        processId: +localStorage.getItem("processId"),
      })
    );
    this.store.select(SELECT_CURRENT_PROCESS).subscribe((tempProcess) => {
      console.log("TEMP PROCESS", tempProcess);
      if (tempProcess != null) {
        this.process = tempProcess;
        this.datesRegistered =
          this.process.endDate !== "" && this.process.outputHour !== "";
        this.updateForm();
        this.emptyProcess = false;
      } else {
        console.log("siempre nulo");
        this.emptyProcess = true;
      }
    });
    this.store
      .select(SELECT_BASIC_REGISTER_LOTS)
      .subscribe((lots) => (this.lots = lots));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
    // this.store
    //   .select(SELECT_BASIC_REGISTER_LOTS)
    //   .subscribe((tempResult) => (this.result = tempResult));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => (this.isNewRegister = isNew));
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
      .subscribe((success) => {
        if (success && this.section === "DESCONGELAMIENTO") {
          this.registerNewProcess();
        }
      });
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.section = section.section));
  }

  selectMaterial() {
    if (!this.onBack) {
      this.lotId.setValue("");
      this.store.dispatch(
        basicRegisterSelectMaterial({
          status: "USED",
          rawMaterialId: this.productId.value.rawMaterialId,
        })
      );
    }
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.isNewRegister
            ? this.store.dispatch(recentRecordsCreateNewProcess())
            : this.registerNewProcess();
        },
      },
    ];
    this.alert.showAlert(
      "Informacion",
      `${
        this.isNewRegister
          ? "Para registrar esta sección se creará un nuevo proceso"
          : ""
      }`,
      "Los campos inhabilitados, deberán igual ser llenados al salir la carne del descongelamiento",
      buttons
    );
  }
  onSubmitDefrost() {
    console.log(this.form.value);
    const { hourExit, dateFinal } = this.form.value;
    const payload = {
      defrost: {
        hourExit,
        dateFin: moment(dateFinal).format("YYYY-MM-DD"),
      },
      processId: this.process.id,
    };
    this.defrost.emit(payload);
  }

  private registerNewProcess() {
    const {
      lotId,
      dateIni,
      hourEntrance,
      productId,
      weight,
      temperature,
      ...value
    } = this.form.value;
    const payload = {
      productId: productId.rawMaterialId,
      lote: {
        loteId: lotId.lotId,
        outputId: lotId.outputId,
      },
      weight,
      temperature,
      dateIni: moment(dateIni).format("YYYY-MM-DD"),
      hourEntrance: moment(hourEntrance).format("HH:mm"),
      processId: localStorage.getItem("processId"),
      productName: productId.rawMaterial,
      lote_interno: lotId.lotId,
    };

    this.submit.emit(payload);
  }

  private updateForm() {
    const {
      productName,
      weigth,
      entranceHour,
      outputHour,
      startDate,
      endDate,
      ...values
    } = this.process;

    this.form.patchValue({
      productId: this.process.rawMaterialName,
      weight: weigth,
      hourEntrance: entranceHour,
      hourExit: outputHour,
      dateIni: startDate,
      dateFinal: endDate,
      lotId: this.process.loteInterno,
      ...values,
    });
  }

  get dateFinal() {
    return this.form.get("dateFinal");
  }

  get hourExit() {
    return this.form.get("hourExit");
  }

  get dateIni() {
    return new Date(this.form.get("dateIni").value).toISOString();
  }

  get productId() {
    return this.form.get("productId");
  }
  get lotId() {
    return this.form.get("lotId");
  }

  get weight() {
    return this.form.get("weight");
  }

  get dataDefrost() {
    return this.dateFinal.value === "" || this.hourExit.value === "";
  }
  get existDataDefrost() {
    return (
      this.form.get("dateFinal").value !== "" &&
      this.form.get("hourExit").value !== ""
    );
  }
}
