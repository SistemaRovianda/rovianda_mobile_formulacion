export interface Formulation {
  productRoviandaId: number;
  lotIdRecordId: string;
  temperature: string;
  temperatureWater: string;
  assigmentLot: AssigmentLot;
  ingredient: Ingredient;
}

export interface AssigmentLot {
  newLotId: string;
  dateEntry: Date;
}

export interface Ingredient {
  lotId: string;
  ingredientId: number;
  checked?: boolean;
}
