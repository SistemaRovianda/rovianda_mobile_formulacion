import { Inject, Injectable } from "@angular/core";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Formulation } from "../models/formulation.interface";
import { HttpClient } from "@angular/common/http";

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

  addFormulation(payload: Formulation) {
    // const f = {
    //   ...payload,
    //   loteId: parseInt(payload.lotId),
    // };
    return this.http.post(`${this.url}/formulation`, payload);
  }
}
