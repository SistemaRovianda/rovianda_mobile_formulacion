import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { DefrostDTO, NewProcess } from "../models/new-process.interface";
import { Defrost } from "../models/defrost.interface";

@Injectable({
  providedIn: "root",
})
export class BasicRegisterService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/process`;
  }

  basicRegisterDefrost(newDefrost: DefrostDTO): Observable<any> {
    console.log(newDefrost);
    return this.http.post<any>(`${this.endpoint}/defrost`, {
      ...newDefrost,
    });
  }

  basicRegisterDefrostUpdate(processId, data: Defrost): Observable<any> {
    return this.http.patch<any>(`${this.url}/defrost/${processId}`, {
      ...data,
    });
  }
  getDefrostData(processId): Observable<any> {
    return this.http.get<any>(`${this.url}/${processId}`);
  }
}
