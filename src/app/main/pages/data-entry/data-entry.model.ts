export interface DataEntry {
  period: Period[];
  currency: Currency[];
  status: string;
  criterion: Criterion;
  business: any[];
  indicator: string;
}

export interface Period {
  id: number;
  name: string;
  status: string;
  count: number;
}

export interface Currency {
  id: number;
  symbol: string;
  status: string;
  description: string;
}

export interface RequestDataEntry {
  period?: number;
  currency?: string;
  month?: string;
  year?: string;
  business?: string;
  type?: string;
  startMonth?: string;
  endMonth?: string;
  startMonthPeriod?: string;
  endMonthPeriod?: string;
  countDays?: string;
  nameCurrency?: string;
}

export interface RequestBusiness {
  status: string;
  business: Business[];
  default: Default[];
}

export interface Business {
  chill: string;
  id: number;
  name: string;
  ruc: string;
  type: string;
  default: string;
  isActive: boolean;
  user: number;
  date: string;
  dateEnd: string;
}

export interface Criterion {
  currency: string;
  endMonth: string;
  endMonthPeriod: string;
  endYear: string;
  endYearPeriod: string;
  id: string;
  period: number;
  startMonth: string;
  startMonthPeriod: string;
  startYear: string;
  startYearPeriod: string;
  nameCurrency: string;
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

export interface Default {
  user: number;
  business: number;
  id: number;
  default: string;
}

export interface DatePeriod {
  startMonth: Date;
  endMonth: Date;
  startMonthPeriod: Date;
  endMonthPeriod: Date;
  period: string;
  countDays: string;
}
