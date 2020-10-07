import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./features/menu/menu.component";
import { MenuModule } from "./features/menu/menu.module";
import { BasicRegistrationPageModule } from "./features/process/page/basic-registration/basic-registration.module";
import { BasicRegistrationPage } from "./features/process/page/basic-registration/basic-registration.page";
import { DefrostDetailPageComponent } from "./features/process/page/defrost-detail/defrost-detail.component";
import { DefrostDetailPageModule } from "./features/process/page/defrost-detail/defrost-detail.module";
import { DefrostListingPageComponent } from "./features/process/page/defrost-listing/defrost-listing.component";
import { DefrostListingPageModule } from "./features/process/page/defrost-listing/defrost-listing.module";
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
    path: "defrost/listing",
    canActivate: [AuthGuard],
    component: DefrostListingPageComponent,
  },
  {
    path: "defrost/:id",
    canActivate: [AuthGuard],
    component: DefrostDetailPageComponent,
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
    DefrostListingPageModule,
    DefrostDetailPageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
