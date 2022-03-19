export interface HistoryData {
  date: string;
  cases_count: number;
  recoveries_count: number;
  deaths_count: number;
  active_cases_count: number;
  total_cases_count: number;
}

export interface HistoryStat {
  success: boolean;
  message: string;
  data: HistoryData[];
}
