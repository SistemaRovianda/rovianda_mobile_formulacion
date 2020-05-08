import { Component, OnInit } from "@angular/core";

import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-generate-report-dialog",
  templateUrl: "./generate-report-dialog.component.html",
  styleUrls: ["./generate-report-dialog.component.scss"],
})
export class GenerateReportDialogComponent implements OnInit {
  report;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }
}
