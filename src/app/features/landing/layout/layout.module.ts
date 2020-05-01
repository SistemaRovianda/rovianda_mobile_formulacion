import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { LoginModule } from "../components/login/login.module";
import { IonicModule } from "@ionic/angular";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
  },
];

const COMMON_IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
  LoginModule,
  IonicModule,
];

const COMMON_DECLARATIONS = [LayoutComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class LayoutModule {}
