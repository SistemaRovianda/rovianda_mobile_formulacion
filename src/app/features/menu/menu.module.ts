import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { IonicModule } from "@ionic/angular";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, IonicModule, TitleHeaderModule, RouterModule],
  exports: [MenuComponent],
})
export class MenuModule {}
