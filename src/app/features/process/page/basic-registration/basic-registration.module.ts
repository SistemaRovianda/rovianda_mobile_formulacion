import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { BasicRegistrationPage } from "./basic-registration.page";

import { FormBasicRegistrationModule } from "../../components/form-basic-registration/form-basic-registration.module";
import { TitleHeaderModule } from "src/app/shared/components/header/header.module";

const COMMON_DECLARATIONS = [BasicRegistrationPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FormBasicRegistrationModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class BasicRegistrationPageModule {}
