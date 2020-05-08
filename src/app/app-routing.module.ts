import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/landing/layout/layout.module").then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: "formulation",
    loadChildren: () =>
      import("./features/formulation/formulation.module").then(
        (m) => m.FormulationModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
