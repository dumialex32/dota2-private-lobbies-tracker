export interface Column {
  id: "replayid" | "winners" | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface Data {
  replayid: string;
  winners: string;
  date: string;
}

export interface MapTeam {
  [key: string]: string;
}
