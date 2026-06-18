export interface DashboardResponse {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
  topCategoriasSaidas: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
  periodo: {
    startDate: string | null;
    endDate: string | null;
  };
}

export interface DashboardParams {
  startDate?: string;
  endDate?: string;
}
