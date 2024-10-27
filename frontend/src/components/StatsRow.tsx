import { LobbyPlayer } from "../types/lobbyPlayersTypes";

const createRow = (label: string, value: number | string) => {
  return { label, value };
};

const StatsRow: React.FC<{ player: LobbyPlayer }> = ({ player }) => {
  const rows = [
    createRow("Total Kills:", player.totalKills),
    createRow("Total Deaths:", player.totalDeaths),
    createRow("Total Assists:", player.totalAssists),
    createRow("Total Net:", player.totalNetworth),
    createRow("Total Games:", player.totalGames),
  ];

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, index) => (
        <div key={index} className="flex justify-between gap-2">
          <p>{row.label}</p>
          <p className="font-semibold">{row.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
