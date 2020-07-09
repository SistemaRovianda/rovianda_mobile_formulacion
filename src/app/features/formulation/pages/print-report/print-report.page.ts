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
    console.log("idFormulation: ", this.idFormulation);
  }

  ngOnInit() {}

  printReport() {
    this.formulationService
      .getReport(this.idFormulation)
      .subscribe((response) => {
        const blob = new Blob([response.body], { type: "application/pdf" });
        const fileName = `formulacion-${this.idFormulation}.pdf`;
        saveAs(blob, fileName);
      });
  }
}
