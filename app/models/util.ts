/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableColumn<T> {
  id: any;
  label: string;
  width?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
  render?: (row: T) => React.ReactNode;
}
