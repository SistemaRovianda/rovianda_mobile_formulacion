import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Lot } from "../models/lot.interface";
import { productsRovianda } from "src/app/features/formulation/store/productsRovianda/reducer";
import { lotsDrief } from "src/app/features/formulation/store/lotsDrief/reducer";

import { OutputsMeat } from "../models/outputsMeat";
import { ingredientsOfProductRovianda } from "src/app/features/formulation/store/ingredients-product-rovianda/reducer";
import { defrostList } from "../models/defrost.interface";

@Injectable({
  providedIn: "root",
})
export class LotService {
  url: string;

  constructor(
    private _http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  // Obteiene los lotes de los ingredientes que se envian
  getLots(
    ingredients: ingredientsOfProductRovianda[]
  ): Observable<lotsDrief[]> {
    return this._http.post<lotsDrief[]>(`${this.url}/ingredients/lots`, {
      lotsId: ingredients.map((x) => x.productId),
    });
  }

  getCatalogLots(): Observable<OutputsMeat[]> {
    return this._http.get<OutputsMeat[]>(`${this.url}/defrost-getinactive`);
  }

  getDefrostLots() {
    return this._http.get<defrostList[]>(`${this.url}/defrost-getactive`);
  }

  getDetailDefrostLot(id: number) {
    return this._http.get(`${this.url}/defrost/${id}`);
  }

  putDetailDefrostLot(id: number, body: any) {
    return this._http.put(`${this.url}/defrost/${id}`, body);
  }
}
