import type { CategoryName } from "../value-objects";

export interface CategoryEntityProps {
  id: string;
  name: CategoryName;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export class CategoryEntity {
  private readonly props: CategoryEntityProps;

  constructor(props: CategoryEntityProps) {
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
  get userId(): string {
    return this.props.userId;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get updatedAt(): string {
    return this.props.updatedAt;
  }
}
