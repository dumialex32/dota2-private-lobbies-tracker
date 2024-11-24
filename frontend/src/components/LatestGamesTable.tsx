import { ChangeEvent, useCallback, useEffect, useState } from "react";
import AlertType from "./AlertType";
import Loader from "./Loader";
import StickyHeadTable from "./StickytHeadTable";
import axiosInstance from "../axios/axiosInstance";
import { useLobby } from "../hooks/useLobbyContext";
import { LobbyGame } from "../types/lobbyGamesTypes";
import { LOBBYGAMES_URL } from "../../constants";
import { formatDate } from "../utils/formatUtils";
import { mapTeam } from "../utils/lobbyGameUtils";
import { Column } from "../types/stickyHeadTableTypes";
import {
  LatestGamesColumn,
  LatestGamesRowData,
} from "../types/latestGamesTableTypes";
import { Link } from "react-router-dom";

function createData(
  replayid: string,
  winners: string,
  date: string
): LatestGamesRowData {
  return { replayid, winners, date };
}

const LatestGamesTable: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [lobbyGames, setLobbyGames] = useState<LobbyGame[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { refetchKey } = useLobby();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  console.log(lobbyGames);
  console.log(total);

  const getLobbyGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance(LOBBYGAMES_URL, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      console.log(res.data);
      setLobbyGames(res.data.data);
      setTotal(res.data.totalLobbyGames);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unknown error occured");
    } finally {
      setIsLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    getLobbyGames();
  }, [refetchKey, getLobbyGames]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns: LatestGamesColumn[] = [
    {
      id: "replayid",
      label: "Replay ID",
      minWidth: 50,
      format: (value) => <Link to={`/lobby/${value}`}>{value}</Link>,
    },
    {
      id: "winners",
      label: "Winners",
      minWidth: 50,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 50,
      align: "right",
    },
  ];

  const rows: LatestGamesRowData[] = lobbyGames.map((lobbyGame) =>
    createData(
      lobbyGame.matchId,
      mapTeam[lobbyGame.gameWinner],
      formatDate(lobbyGame.createdAt)
    )
  );

  if (isLoading) return <Loader />;
  if (error) return <AlertType type="error" msg={error} />;

  return (
    <StickyHeadTable<LatestGamesRowData>
      total={total}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      columns={columns}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangePage={handleChangePage}
    />
  );
};

export default LatestGamesTable;
