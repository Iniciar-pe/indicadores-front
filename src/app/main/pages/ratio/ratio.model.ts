export interface RequestRatios {
  ratios: Ratios[];
  status: string;
  default: DatePeriodRequest;
}

export interface Ratios {
  description: string;
  formula: string;
  name: string;
  result: string;
  id: number;
  value: string;
  detailResult: string;
}

export interface DatePeriodRequest {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  startMonthPrevious: string;
  startYearPrevious: string;
  endMonthPrevious: string;
  endYearPrevious: string;
  period: string;
  countDays: string;
  symbol: string;
}