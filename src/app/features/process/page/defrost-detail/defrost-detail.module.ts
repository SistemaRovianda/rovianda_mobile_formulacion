import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";
import { IonicModule } from "@ionic/angular";
import { DefrostListingFormModule } from "../../components/defrost-listing-form/defrost-listing-form.module";
import { DefrostDetailPageComponent } from "./defrost-detail.component";

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  DefrostListingFormModule,
];
const COMMON_DECLARATIONS = [DefrostDetailPageComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class DefrostDetailPageModule {}
