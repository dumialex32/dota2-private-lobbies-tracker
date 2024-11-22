import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Loader from "./Loader";
import AlertType from "./Alert";

import { Link } from "react-router-dom";

import useStickyHeadTable from "../hooks/useStickyHeadTable";

export default function StickyHeadTable() {
  const {
    lobbyGames,
    isLoading,
    error,
    columns,
    rows,
    page,
    rowsPerPage,
    total,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useStickyHeadTable();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertType type="error" msg={error} />
      ) : lobbyGames.length === 0 && !error ? (
        <AlertType type="info" msg="No replays have been added yet" />
      ) : (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
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
                {rows.map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                      sx={{
                        backgroundImage:
                          "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ color: "white" }}
                          >
                            {column.id === "replayid" ? (
                              <Link to={`/lobby/${value}`}>{value}</Link>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6, 10, 20]}
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
      )}
    </>
  );
}
