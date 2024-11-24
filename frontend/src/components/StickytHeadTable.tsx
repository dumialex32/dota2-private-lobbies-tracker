import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { StickyHeadTableProps } from "../types/stickyHeadTableTypes";

export default function StickyHeadTable<T extends Record<string, unknown>>({
  rows,
  columns,
  total,
  handleChangeRowsPerPage,
  handleChangePage,
  page,
  rowsPerPage,
  rowsPerPageOptions = [6, 12, 18],
}: StickyHeadTableProps<T>) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundImage:
                      "linear-gradient(to right, #868f96 0%, #596164 50%, #868f96 100%)",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={rowIndex}
                sx={{
                  backgroundImage:
                    "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={String(column.id)}
                      align={column.align}
                      style={{ color: "white" }}
                    >
                      {column.format ? column.format(value) : String(value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundImage:
            "linear-gradient(to right, #868f96 0%, #596164 100%);",
          color: "white",
        }}
      />
    </Paper>
  );
}
