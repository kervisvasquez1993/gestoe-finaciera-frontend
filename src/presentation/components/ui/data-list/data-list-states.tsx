import type { ReactNode } from "react";

import { useDataListContext } from "./data-list.context";

interface SlotProps {
  children: ReactNode;
}

export const DataListLoading = ({ children }: SlotProps) => {
  const { isLoading } = useDataListContext();
  return isLoading ? <>{children}</> : null;
};

export const DataListError = ({ children }: SlotProps) => {
  const { isLoading, isError } = useDataListContext();
  return !isLoading && isError ? <>{children}</> : null;
};

export const DataListEmpty = ({ children }: SlotProps) => {
  const { isLoading, isError, isEmpty } = useDataListContext();
  return !isLoading && !isError && isEmpty ? <>{children}</> : null;
};

export const DataListContent = ({ children }: SlotProps) => {
  const { isLoading, isError, isEmpty } = useDataListContext();
  return !isLoading && !isError && !isEmpty ? <>{children}</> : null;
};
