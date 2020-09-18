import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { timeStamp } from "console";
import { FormulationService } from "src/app/shared/services/formulation.service";

import { saveAs } from "file-saver/dist/fileSaver";

@Component({
  selector: "print-report",
  templateUrl: "./print-report.page.html",
  styleUrls: ["./print-report.page.scss"],
})
export class PrintReportPageComponent implements OnInit {
  idFormulation: string;

  constructor(
    private route: ActivatedRoute,
    private formulationService: FormulationService
  ) {
    this.idFormulation = this.route.snapshot.params.id;
  }

  ngOnInit() {}

  printReport() {
    console.log("Imprimir reporte");

    this.formulationService.getReport(this.idFormulation);
  }
}
