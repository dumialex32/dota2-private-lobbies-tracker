import { ReactNode } from "react";

export interface MapTeam {
  [key: string]: string;
}

// sticky head table props
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: any) => ReactNode;
}

export interface StickyHeadTableProps<T extends Record<string, any>> {
  rows: T[];
  columns: Array<{
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: "right" | "center" | "left";
    format?: (value: T[keyof T]) => ReactNode;
  }>;
  total: number;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPageOptions?: number[];
}
