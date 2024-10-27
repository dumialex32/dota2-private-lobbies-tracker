import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PlayerInfo } from "../../types/lobbyGamesTypes";
import { formatHeroName } from "../../utils/formatUtils";

function createData(
  name: string,
  hero: string,
  k: number,
  d: number,
  a: number,
  lh: number,
  dn: number,
  net: number,
  steamid: string
) {
  return { name, hero, k, d, a, lh, dn, net, steamid };
}

const BasicTable: React.FC<{ players: PlayerInfo[] | undefined }> = ({
  players,
}) => {
  const rows = players?.map((player) => {
    return createData(
      player.playerName,
      player.heroName,
      player.kills,
      player.deaths,
      player.assists,
      player.lastHits,
      player.denies,
      player.networth,
      player.steamId
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          color: "white",
          "& .MuiTableCell-root": { color: "white" },
        }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            backgroundImage:
              "linear-gradient(to right, #868f96 0%, #596164 50%, #868f96 100%)",
          }}
        >
          <TableRow>
            <TableCell sx={{ width: "20%" }}>Player</TableCell>
            <TableCell align="right" sx={{ width: "20%" }}>
              Hero
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              K
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              D
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              A
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              LH
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              DN
            </TableCell>
            <TableCell align="right" sx={{ width: "10%" }}>
              NET
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundImage:
                    "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
                }}
              >
                <TableCell>
                  <a
                    href={`https://www.dotabuff.com/players/${row.steamid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.name}
                  </a>
                </TableCell>
                <TableCell align="right">{formatHeroName(row.hero)}</TableCell>
                <TableCell align="right">{row.k}</TableCell>
                <TableCell align="right">{row.d}</TableCell>
                <TableCell align="right">{row.a}</TableCell>
                <TableCell align="right">{row.lh}</TableCell>
                <TableCell align="right">{row.dn}</TableCell>
                <TableCell align="right">{row.net}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
