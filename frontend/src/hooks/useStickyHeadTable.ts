import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLobby } from "./useLobbyContext";
import axios from "axios";
import { Column, Data } from "../types/stickyHeadTableTypes";
import { LOBBYGAMES_URL } from "../../constants";
import { formatDate } from "../utils/formatUtils";
import { mapTeam } from "../utils/lobbyGameUtils";
import { LobbyGame } from "../types/lobbyGamesTypes";

const ROWS_PER_PAGE = 6;

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

const useStickyHeadTable = () => {
  const [error, setError] = useState<string>("");
  const [lobbyGames, setLobbyGames] = useState<LobbyGame[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [total, setTotal] = useState<number>(0);
  const { refetchKey } = useLobby();

  const getLobbyGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(LOBBYGAMES_URL, {
        params: { page: page + 1, limit: rowsPerPage },
      });

      setLobbyGames(res.data.data);
      setTotal(res.data.totalLobbyGames);
    } catch (err: any) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        console.error(err.response);
        setError(err.response?.data.message);
      } else {
        setError(err.message || "Request failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    getLobbyGames();
  }, [refetchKey, page, getLobbyGames]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
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

  return {
    lobbyGames,
    isLoading,
    error,
    rows,
    page,
    rowsPerPage,
    columns,
    total,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useStickyHeadTable;
