import type { IDashboardQuery } from "../../../domain/dashboard/dto";
import type { DashboardSummaryEntity } from "../../../domain/dashboard/entities";
import type { IDashboardRepository } from "../../../domain/dashboard/repositories";
import { UnexpectedError } from "../../../domain/shared/errors";
import { getDashboardAction } from "../../actions/dashboard";
import { normalizeHttpError } from "../../api/http-error";
import { DashboardMapper } from "../../mappers/dashboard";

export class DashboardRepositoryImpl implements IDashboardRepository {
  async getSummary(query?: IDashboardQuery): Promise<DashboardSummaryEntity> {
    try {
      const response = await getDashboardAction(query);
      return DashboardMapper.toEntity(response);
    } catch (error) {
      const { messages } = normalizeHttpError(error);
      throw new UnexpectedError(messages[0]);
    }
  }
}

export const dashboardRepository: IDashboardRepository =
  new DashboardRepositoryImpl();
