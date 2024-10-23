import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { LOBBYGAMES_URL } from "../../constants";
import Loader from "./Loader";
import Error from "./Error";
import { LobbyGames } from "../types/lobbyGamesTypes";
import { useLobby } from "../hooks/useLobbyContext";

interface Column {
  id: "replayid" | "winners" | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
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

interface Data {
  replayid: string;
  winners: string;
  date: string;
}

function createData(replayid: string, winners: string, date: string): Data {
  return { replayid, winners, date };
}

const rows = [
  createData("2352345", "R", "10/20/2024"),
  createData("2352345", "R", "10/20/2024"),
];

export default function StickyHeadTable() {
  const { refetchKey } = useLobby();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [lobbyGames, setLobbyGames] = React.useState<LobbyGames | undefined>();

  console.log(lobbyGames);

  React.useEffect(() => {
    const getLobbyGames = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(LOBBYGAMES_URL);

        setLobbyGames(res.data);
      } catch (err: any) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          console.log(err.status);
          console.error(err.response);
          setError(err.response?.data.message);
        } else {
          setError("Request failed");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getLobbyGames();
  }, [refetchKey]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error type="error" msg={error} />
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
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
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
