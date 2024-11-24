import { ReactNode } from "react";

// latest games table types
export interface LatestGamesColumn {
  id: "replayid" | "winners" | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number) => ReactNode;
}

export interface LatestGamesRowData {
  replayid: string;
  winners: string;
  date: string;
  [key: string]: string; // Flexible to accommodate extra properties.
}
