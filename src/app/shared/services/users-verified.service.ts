import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { UserVerified } from "../models/user.interface";

@Injectable({
  providedIn: "root",
})
export class UsersVerifiedService {
  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {}

  getUsersVerified(): Observable<UserVerified[]> {
    return this.http.get<UserVerified[]>(`${this.endpoint}/user`);
  }
}
