export interface NewProcess {
  productId: number;
  lote: LotProduct;
  weight: number;
  temperature: string;
  hourEntrance: string;
  dateIni: string;
  processId: number;
  productName?: string;
}

export interface LotProduct {
  loteId: string;
  outputId: number;
}


export interface DefrostDTO{
  outputCoolingId:number;
  weight: string;
  temp: string;
  entranceHour: string;
  dateInit: string; 
}