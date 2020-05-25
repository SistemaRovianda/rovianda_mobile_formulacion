import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddIngredientPageModule } from "./pages/add-ingredient/add-ingredient.module";
import { PrintReportPageModule } from "./pages/print-report/print-report.module";
import { PrintReportPageComponent } from "./pages/print-report/print-report.page";
import { RegisterProductPageModule } from "./pages/register-product/register-product.module";
import { RegisterProductPageComponent } from "./pages/register-product/register-product.page";
import { ProductsResolve } from "src/app/shared/resolvers/products.resolver";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "register-product",
        resolve: {
          products: ProductsResolve,
        },
        component: RegisterProductPageComponent,
      },
      {
        path: "print-report",
        component: PrintReportPageComponent,
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
  providers: [ProductsResolve],
  exports: [RouterModule],
})
export class FormulationRoutingModule {}
