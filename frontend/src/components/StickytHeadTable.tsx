import * as React from "react";
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
import { useLobby } from "../hooks/useLobbyContext";
import { formatDate } from "../utils/formatUtils";
import { Column, Data, MapTeam } from "../types/stickyHeadTableTypes";
import { Link } from "react-router-dom";
import { mapTeam } from "../utils/lobbyGameUtils";

function createData(replayid: string, winners: string, date: string): Data {
  return { replayid, winners, date };
}

const columns: readonly Column[] = [
  { id: "replayid", label: "Replay ID", minWidth: 50 },
  { id: "winners", label: "Winners", minWidth: 50 },
  {
    id: "date",
    label: "Date",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable() {
  const { lobbyGames, isLoading, error } = useLobby();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log(lobbyGames);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = lobbyGames.map((lobbyGame) => {
    return createData(
      lobbyGame.matchId,
      mapTeam[lobbyGame.gameWinner],
      formatDate(lobbyGame.createdAt)
    );
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <AlertType type="error" msg={error} />
      ) : lobbyGames.length === 0 ? (
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
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
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
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
