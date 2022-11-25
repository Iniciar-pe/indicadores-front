export interface DataEntry {
  period: Period[];
  currency: Currency[];
  status: string;
  criterion: Criterion;
  business: number;
  indicator: string;
}

export interface Period {
  id: number;
  name: string;
  status: string;
}

export interface Currency {
  id: number;
  symbol: string;
  status: string;
  description: string;
}

export interface RequestDataEntry {
  period?: string;
  currency?: string;
  month?: string;
  year?: string;
  business?: string;
}

export interface RequestBusiness {
  status: string;
  business: Business[];
}

export interface Business {
  chill: string;
  id: number;
  name: string;
  ruc: string;
  type: string;
  default: string;
  isActive: boolean,
}

export interface Criterion {
  currency: string;
  endMonth: string;
  endMonthPeriod: string;
  endYear: string;
  endYearPeriod: string;
  id: string;
  period: string;
  startMonth: string;
  startMonthPeriod: string;
  startYear: string;
  startYearPeriod: string;
}

export interface ValuesRequest {
  status: string;
  values: Values[];
}

export interface Values {
  id: number;
  description: string;
  name: string;
  currentPeriod: string;
  previousPeriod: string;
  previousEdit: string;
  currentEdit: string;
  note: string;
}