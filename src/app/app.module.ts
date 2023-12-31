import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { effects } from "./shared/store/effects/index.effects";
import { reducers, metaReducers } from "./shared/store/reducers/index.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppProvidersModule } from "./providers/app-providers.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { IsAuthGuard } from "./shared/guards/isAuth.guard";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { IonicStorageModule } from "@ionic/storage";

import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      scrollPadding: true,
      scrollAssist: true,
      inputBlurring: true,
      inputShims: true,
    }),
    AppRoutingModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
    }),
    HttpClientModule,
    AppProvidersModule,
  ],
  providers: [
    AuthGuard,
    IsAuthGuard,
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileTransferObject,
    FileOpener,
    File,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppProvidersModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
