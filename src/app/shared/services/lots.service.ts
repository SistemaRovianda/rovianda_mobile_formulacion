import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Lot } from "../models/lot.interface";

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
  getLots(ingredientsId: number[]): Observable<Lot[]> {
    return this._http.post<Lot[]>(`${this.url}/ingredients/lots`, {
      lotsId: ingredientsId,
    });
  }

  getCatalogLots(): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        status: "NOTUSED"
      }
    });
    return this._http.get<any[]>(`${this.url}/meat/lots/output`, { params });
  }
}
