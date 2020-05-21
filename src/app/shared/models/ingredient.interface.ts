// /lot/ingredients

export interface IngredientM {
  productId: number;
  description: string;
}

// /product-rovianda/:productId
export interface IngredientP {
  id: number;
  description: string;
  type: string;
}

// formacion interna de la app
export interface IngredientC {
  ingredientId?: number;
  description?: string;
  checked?: boolean;
}
