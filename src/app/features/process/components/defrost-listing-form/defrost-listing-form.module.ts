import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefrostListingFormComponent } from "./defrost-listing-form.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
];
const COMMON_DECLARATIONS = [DefrostListingFormComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class DefrostListingFormModule {}
