import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Observable } from "rxjs";
import { Ingredient } from "../models/formulation.interface";
import { Product } from "../models/product.interface";
import { IngredientM } from "../models/ingredient.interface";

@Injectable({
  providedIn: "root",
})
export class IngredientsService {
  url: string;

  constructor(
    private _http: HttpClient,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  //   getIngredientsByProductId(productId: string): Observable<any> {
  //     return this._http
  //       .get<any>(`${this.url}/product-rovianda/${productId}`, {
  //         observe: "response",
  //       })
  //       .pipe(
  //         map((response) => {
  //           return response.body.ingredients;
  //         })
  //       );
  //   }

  // Se obtiene el producto seleccionado para despues obtener sus ingredientes
  getIngredientsByProductId(productId: string): Observable<Product> {
    console.trace("products rovianda null");
    return this._http.get<Product>(`${this.url}/product-rovianda/${productId}`);
  }

  // Ingredientes para modal
  getIngredients(): Observable<IngredientM[]> {
    console.log("CONSUMIENDO SERVICIO DE MODAL");
    return this._http.get<IngredientM[]>(`${this.url}/lot/ingredients`);
  }
}
