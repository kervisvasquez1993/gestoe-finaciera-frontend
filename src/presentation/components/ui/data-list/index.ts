import { DataListRoot } from "./data-list-root";
import {
  DataListContent,
  DataListEmpty,
  DataListError,
  DataListLoading,
} from "./data-list-states";

export const DataList = Object.assign(DataListRoot, {
  Loading: DataListLoading,
  Error: DataListError,
  Empty: DataListEmpty,
  Content: DataListContent,
});
