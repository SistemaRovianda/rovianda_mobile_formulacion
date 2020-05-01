import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMON_DECLARATIONS = [LoginComponent];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class LoginModule {}
