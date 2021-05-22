export class Process {
  id: number;
  processId?:number;
  productName: string;
  loteInterno: string;
  date: string;
  currentProccess: string;
  weigth: number;
  temperature: number;
  startDate: string;
  endDate: string;
  entranceHour: string;
  outputHour: string;
  createAt: string;
  rawMaterialName?:string;
}


export interface processIngredient{
  processId:number,
  dateEnded:string,
  ingredients: processIngredientItem[],
  productName:string,
  assigned?: boolean
}

export interface processIngredientItem{
  lotId:string,
  rawMaterial:string;
}