export interface TopCategorySaida {
  categoryId: string;
  categoryName: string;
  total: number;
}

export interface DashboardPeriod {
  startDate: string | null;
  endDate: string | null;
}

export interface DashboardSummaryProps {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
  topCategoriasSaidas: TopCategorySaida[];
  periodo: DashboardPeriod;
}

export class DashboardSummaryEntity {
  private readonly props: DashboardSummaryProps;

  constructor(props: DashboardSummaryProps) {
    this.props = props;
  }

  get saldoAtual(): number {
    return this.props.saldoAtual;
  }
  get totalEntradas(): number {
    return this.props.totalEntradas;
  }
  get totalSaidas(): number {
    return this.props.totalSaidas;
  }
  get topCategoriasSaidas(): TopCategorySaida[] {
    return this.props.topCategoriasSaidas;
  }
  get periodo(): DashboardPeriod {
    return this.props.periodo;
  }

  isPositive(): boolean {
    return this.props.saldoAtual >= 0;
  }
}
