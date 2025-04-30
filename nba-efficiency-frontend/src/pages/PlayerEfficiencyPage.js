import React, { useEffect, useState } from "react";

function PlayerEfficiencyPage() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [minGames, setMinGames] = useState(0);

  useEffect(() => {
    fetch("https://nba-efficiency-static-api.onrender.com/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filteredPlayers = players.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.team.toLowerCase().includes(search.toLowerCase())) &&
      p.gamesPlayed >= minGames
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>NBA Player Efficiency Dashboard</h1>

      <input
        type="text"
        placeholder="Search by player or team"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "12px 0", padding: 8, width: "300px" }}
      />

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>OES</th>
            <th>ODES</th>
            <th>Avg +/-</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.oes.toFixed(1)}</td>
              <td>{player.odes.toFixed(1)}</td>
              <td>{player.avgPlusMinus.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerEfficiencyPage;