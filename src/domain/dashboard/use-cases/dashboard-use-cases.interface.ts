import type { IDashboardQuery } from "../dto";
import type { DashboardSummaryEntity } from "../entities";

export interface IDashboardUseCases {
  getSummary(query?: IDashboardQuery): Promise<DashboardSummaryEntity>;
}
