import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Product } from "../models/product.interface";
import { productsRovianda } from 'src/app/features/formulation/store/productsRovianda/reducer';

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

  getProducts(): Observable<productsRovianda[]> {
    return this._http.get<productsRovianda[]>(`${this.url}/products-rovianda`);
  }

  getIngredientsByProductId(productId: number): Observable<Product> {
    console.trace("products rovianda null");
    return this._http.get<Product>(`${this.url}/product-rovianda/${productId}`);
  }
}
