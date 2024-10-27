import { ChangeEvent, useEffect, useState } from "react";
import { useLobby } from "./useLobbyContext";
import axios from "axios";
import { Column, Data } from "../types/stickyHeadTableTypes";
import { LOBBYGAMES_URL } from "../../constants";
import { formatDate } from "../utils/formatUtils";
import { mapTeam } from "../utils/lobbyGameUtils";
import { LobbyGame } from "../types/lobbyGamesTypes";

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
  const { refetchKey } = useLobby();
  console.log(lobbyGames);

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
        setError(err.message || "Request failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLobbyGames();
  }, [refetchKey]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(lobbyGames);

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
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useStickyHeadTable;
