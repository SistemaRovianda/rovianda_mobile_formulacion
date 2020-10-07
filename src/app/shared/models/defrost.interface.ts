export interface Defrost {
  hourExit: string;
  dateFin: string;
}

export interface defrostList {
  lotId: string;
  defrostId: string;
  quantity: number;
  dateDefrost: string;
  rawMaterial?: string;
}

export interface defrostDetail {
  defrostId: number;
  weigth: number;
  temp: number;
  entranceHour: string;
  outputHour: string;
  dateInit: string;
  dateEnd: string;
  status: string;
  outputCooling: outputCooling;
}

export interface outputCooling {
  id: number;
  outputDate: string;
  loteInterno: string;
  quantity: string;
  observations: string;
  status: string;
}
