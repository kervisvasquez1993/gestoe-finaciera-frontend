import type { CategoryName } from "../value-objects";

export interface CategorySummaryProps {
  id: string;
  name: CategoryName;
  description: string | null;
  transactionsCount: number;
  totalEntradas: number;
  totalSaidas: number;
  createdAt: string;
  updatedAt: string;
}

export class CategorySummaryEntity {
  private readonly props: CategorySummaryProps;

  constructor(props: CategorySummaryProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get name(): CategoryName {
    return this.props.name;
  }
  get description(): string | null {
    return this.props.description;
  }
  get transactionsCount(): number {
    return this.props.transactionsCount;
  }
  get totalEntradas(): number {
    return this.props.totalEntradas;
  }
  get totalSaidas(): number {
    return this.props.totalSaidas;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }

  hasTransactions(): boolean {
    return this.props.transactionsCount > 0;
  }
}
