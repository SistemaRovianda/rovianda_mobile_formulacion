import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddIngredientPageModule } from "./pages/add-ingredient/add-ingredient.module";
import { AddIngredientPageComponent } from "./pages/add-ingredient/add-ingredient.page";
import { PrintReportPageModule } from "./pages/print-report/print-report.module";
import { PrintReportPageComponent } from "./pages/print-report/print-report.page";
import { RegisterProductPageModule } from "./pages/register-product/register-product.module";
import { RegisterProductPageComponent } from "./pages/register-product/register-product.page";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "register-product",
        component: RegisterProductPageComponent,
      },
      {
        path: "print-report",
        component: PrintReportPageComponent,
      },
      {
        path: "add-ingredient",
        component: AddIngredientPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PrintReportPageModule,
    RegisterProductPageModule,
    AddIngredientPageModule,
  ],
  exports: [RouterModule],
})
export class FormulationRoutingModule {}
