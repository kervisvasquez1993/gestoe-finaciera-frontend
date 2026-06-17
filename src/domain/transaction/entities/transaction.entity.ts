import type { CategoryEntity } from "../../category/entities";
import type { Money, TransactionType } from "../value-objects/value-objects";

export interface TransactionEntityProps {
  id: string;
  description: string;
  amount: Money;
  type: TransactionType;
  date: string; // YYYY-MM-DD
  categoryId: string;
  category?: CategoryEntity;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export class TransactionEntity {
  private readonly props: TransactionEntityProps;

  constructor(props: TransactionEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get description(): string {
    return this.props.description;
  }
  get amount(): Money {
    return this.props.amount;
  }
  get type(): TransactionType {
    return this.props.type;
  }
  get date(): string {
    return this.props.date;
  }
  get categoryId(): string {
    return this.props.categoryId;
  }
  get category(): CategoryEntity | undefined {
    return this.props.category;
  }
  get userId(): string {
    return this.props.userId;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }

  // Monto con signo según el tipo (útil para UI / cálculos locales)
  signedAmount(): number {
    const value = this.props.amount.toNumber();
    return this.props.type.isSaida() ? -value : value;
  }
}
