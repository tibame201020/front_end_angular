export interface RecordInfo {
  recordPk:RecordPk;
  accountOutline:string;
  cash:number;
  recordTime:string;
  stockVolumes:StockVolume[];
  total:number;
  visibility:string;
}

export interface RecordPk {
  account:string;
  date:string;
}

export interface StockVolume {
  code:string;
  volume:number;
}
