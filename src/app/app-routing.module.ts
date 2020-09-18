import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./features/menu/menu.component";
import { MenuModule } from "./features/menu/menu.module";
import { BasicRegistrationPageModule } from "./features/process/page/basic-registration/basic-registration.module";
import { BasicRegistrationPage } from "./features/process/page/basic-registration/basic-registration.page";
import { AuthGuard } from "./shared/guards/auth.guard";
import { IsAuthGuard } from "./shared/guards/isAuth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [IsAuthGuard],
    loadChildren: () =>
      import("./features/landing/layout/layout.module").then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: "menu",
    canActivate: [AuthGuard],
    component: MenuComponent,
  },
  {
    path: "process/basic-registration",
    canActivate: [AuthGuard],
    component: BasicRegistrationPage,
  },
  {
    path: "formulation",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/formulation/formulation.module").then(
        (m) => m.FormulationModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    MenuModule,
    BasicRegistrationPageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
