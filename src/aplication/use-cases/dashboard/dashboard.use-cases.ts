import type { IDashboardQuery } from "../../../domain/dashboard/dto";
import type { DashboardSummaryEntity } from "../../../domain/dashboard/entities";
import type { IDashboardRepository } from "../../../domain/dashboard/repositories";
import type { IDashboardUseCases } from "../../../domain/dashboard/use-cases";
import { dashboardRepository } from "../../../infrastructure/repositories/dashboard";

export class DashboardUseCases implements IDashboardUseCases {
  private readonly repository: IDashboardRepository;

  constructor(repository: IDashboardRepository) {
    this.repository = repository;
  }

  getSummary(query?: IDashboardQuery): Promise<DashboardSummaryEntity> {
    return this.repository.getSummary(query);
  }
}

export const dashboardUseCases = new DashboardUseCases(dashboardRepository);
