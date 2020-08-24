import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { qualityUser } from 'src/app/features/formulation/store/quality-user/reducer';

@Injectable({
  providedIn: "root",
})
export class UsersVerifiedService {
  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {}

  getUsersVerified(): Observable<qualityUser[]> {
    return this.http.get<qualityUser[]>(`${this.endpoint}/user/rol/quality`);
  }
}
