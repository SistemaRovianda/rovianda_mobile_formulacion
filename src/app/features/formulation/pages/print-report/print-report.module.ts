import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { PrintReportPageComponent } from "./print-report.page";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  RouterModule,
  TitleHeaderModule,
];

const COMMON_DECLARATIONS = [PrintReportPageComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class PrintReportPageModule {}
