import type { ReactNode } from "react";

import { DataListContext } from "./data-list.context";

interface DataListRootProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  children: ReactNode;
}

export const DataListRoot = ({
  isLoading,
  isError,
  isEmpty,
  children,
}: DataListRootProps) => {
  return (
    <DataListContext.Provider value={{ isLoading, isError, isEmpty }}>
      {children}
    </DataListContext.Provider>
  );
};
