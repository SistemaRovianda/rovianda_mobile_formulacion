import { Ingredient } from "./formulation.interface";
import { IngredientP } from "./ingredient.interface";


export interface Product {
  id?: number;
  name?: string;
  ingredients?: any[];
}
