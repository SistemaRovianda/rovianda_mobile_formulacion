import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ListComponent } from "./list.component";
import { RouterModule } from "@angular/router";

const COMMON_IMPORTS = [CommonModule, IonicModule, RouterModule];
const COMMON_DECLARATIONS = [ListComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class ListModule {}
