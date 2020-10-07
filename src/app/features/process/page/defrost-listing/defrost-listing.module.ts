import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";
import { ListModule } from "../../components/list/list.module";
import { DefrostListingPageComponent } from "./defrost-listing.component";

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  ListModule,
];
const COMMON_DECLARATIONS = [DefrostListingPageComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class DefrostListingPageModule {}
