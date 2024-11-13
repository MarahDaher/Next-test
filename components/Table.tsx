import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableColumn } from "@/app/models/util";

interface ReusableTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  title?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

/**
 * ReusableTable component renders a table with customizable columns and row actions.
 * Supports edit and delete actions on each row when callbacks are provided.
 *
 * @param {ReusableTableProps<T>} props - Properties to configure the table
 * @param {TableColumn<T>[]} props.columns - Configuration for table columns
 * @param {T[]} props.data - Data array to populate the table rows
 * @param {string} [props.title] - Optional title for the table
 * @param {Function} [props.onEdit] - Callback for editing a row
 * @param {Function} [props.onDelete] - Callback for deleting a row
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReusableTable = <T extends { [key: string]: any }>({
  columns,
  data,
  onEdit,
  onDelete,
}: ReusableTableProps<T>) => (
  <TableContainer component={Paper}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {/* Render table headers */}
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align || "left"}
              style={{ width: column.width }}
            >
              {column.label}
            </TableCell>
          ))}
          {/* Actions column if onEdit or onDelete is provided */}
          {(onEdit || onDelete) && (
            <TableCell align="center">Actions</TableCell>
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
            {/* Render data cells */}
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align || "left"}>
                  {column.render
                    ? column.render(row)
                    : column.format
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}

            {/* Action icons for edit and delete */}
            {(onEdit || onDelete) && (
              <TableCell align="center">
                {onEdit && (
                  <IconButton onClick={() => onEdit(row)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton onClick={() => onDelete(row)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ReusableTable;
