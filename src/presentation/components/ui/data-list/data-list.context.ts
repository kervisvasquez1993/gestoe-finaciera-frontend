import { createContext, useContext } from "react";

interface DataListContextValue {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export const DataListContext = createContext<DataListContextValue | null>(null);

export const useDataListContext = () => {
  const ctx = useContext(DataListContext);
  if (!ctx) {
    throw new Error("DataList.* deve ser usado dentro de <DataList>");
  }
  return ctx;
};
