import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppStateInterface } from "src/app/shared/models/storeState.interface";
import {
  SELECT_USER_CURRENT_TOKEN,
  SELECT_USER_TOKEN,
} from "src/app/features/landing/store/authentication/authentication.selectors";

@Injectable({
  providedIn: "root",
})
export class AuthorizationTokenInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppStateInterface>) {
    this.store.select(SELECT_USER_TOKEN).subscribe((token) => {
      this.token = token;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.token || "");

    if (this.token != "" || this.token != null) {
      request = req.clone({
        headers: headers,
      });
    }
    return next.handle(request);
  }
}
