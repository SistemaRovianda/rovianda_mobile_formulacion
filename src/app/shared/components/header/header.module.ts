import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TitleHeaderComponent } from "./header.component";

@NgModule({
  declarations: [TitleHeaderComponent],
  imports: [CommonModule, IonicModule],
  exports: [TitleHeaderComponent],
})
export class TitleHeaderModule {}
