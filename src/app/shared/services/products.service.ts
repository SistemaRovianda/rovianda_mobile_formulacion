import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Product } from "../models/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  url: string;

  constructor(
    private _http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.url}/products-rovianda`);
  }
}
