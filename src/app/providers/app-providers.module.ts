import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationTokenInterceptor } from "./interceptor";
import { environment } from "src/environments/environment";
import { API_ENDPOINT_PROVIDER } from "./tokens";

@NgModule({
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationTokenInterceptor,
      multi: true,
    },
    {
      provide: API_ENDPOINT_PROVIDER,
      useValue: environment.basePathMock,
    },
  ],
})
export class AppProvidersModule {}
