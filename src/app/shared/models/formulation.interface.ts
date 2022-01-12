export interface Formulation {
  productRoviandaId: number;
  temperature: string;
  temperatureWater: string;
  assigmentLot: AssigmentLot;
  lotIdRecordId?: string;
  makeId?: string;
  lotsDefrost?: losDefrost[];
  ingredient: Ingredient;
  processIngredients:number[]
}

export interface AssigmentLot {
  newLotId: string;
  dateEntry: Date;
}

export interface Ingredient {
  lotId: string;
  ingredientId: number;
  lotRecordId?: number;
  checked?: boolean;
}

export interface losDefrost {
  lotId: string;
  defrostId: number;
}
