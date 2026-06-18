import type { IDashboardQuery } from "../dto";
import type { DashboardSummaryEntity } from "../entities";

export interface IDashboardRepository {
  getSummary(query?: IDashboardQuery): Promise<DashboardSummaryEntity>;
}
