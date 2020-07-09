import { Inject, Injectable } from "@angular/core";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Formulation } from "../models/formulation.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormulationService {
  url: string;
  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  addFormulation(payload: Formulation): Observable<any> {
    // const f = {
    //   ...payload,
    //   loteId: parseInt(payload.lotId),
    // };
    return this.http.post<any>(`${this.url}/formulation`, payload);
  }

  getReport(idFormulation: string): Observable<any> {
    return this.http.get(`${this.url}/report/formulation/${idFormulation}`, {
      responseType: "arraybuffer",
      observe: "response",
    });
  }
}
