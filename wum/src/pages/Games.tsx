import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import useGames from "../core/Games";
import useLeaderboard, { playerById } from "../core/Leaderboard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from 'react-table'
import Cfg from '../core/Config';
import { useUnmapper } from '../core/Pages';
import "../assets/table.css";
import { getDefaultFormatCodeSettings } from 'typescript';

type GamesProps = {
  onJoin: (game_id: number) => void;
}

export default function Games(props: GamesProps) {
  let _ = props;
  const language = useLanguageContext();
  ld.setLanguage(language);

  const [leaderboard, dispatch_leaderboard] = useLeaderboard(true);
  const [games, dispatch_games] = useGames();
  const [isFetched, setIsFetched] = useState(false);

  if (isFetched === false) {
    Cfg.get("/players/",
      (players) => dispatch_leaderboard({ type: "populate", content: players }),
      (response) => {
        console.log(response);
        throw "unable to acquire players";
      });
    Cfg.get("/games/",
      (games) => dispatch_games({ type: "populate", content: games }),
      (response) => {
        console.log(response);
        throw "unable to acquire games";
      });
    setIsFetched(true);
  }

  const unmapper = useUnmapper(games.content);
  const data = React.useMemo(() => games.pages.length > 0 ? games.pages[games.page].indices.map((page_entry) => {
    const entry = unmapper(page_entry);
    const owner = playerById(entry["owner"], leaderboard.content);
    const players = entry["players"].map(i => playerById(i, leaderboard.content));
    const getPlayerName = (player: any) => player ? player.name : "unknown";
    return {
      ...entry,
      player_count: entry["players"].length,
      player_names: players.map(getPlayerName),
      owner_name: getPlayerName(owner),
    }
  }) : [], [games.page, games.pages.length]);

  return ( //<div className="ReactTable">
    <div className="table_box">
      <button onClick={() => {
        dispatch_leaderboard({
          type: "invalidate",
        });
        dispatch_games({
          type: "invalidate",
        });
      }}>{ld.formatString(ld.refresh)}</button>
      <button onClick={() => dispatch_games({ type: "next" })}>{ld.formatString(ld.nextPage)}</button>
      <button onClick={() => dispatch_games({ type: "previous" })}>{ld.formatString(ld.previousPage)}</button>
      <button onClick={() => dispatch_games({ type: "begin" })}>{ld.formatString(ld.firstPage)}</button>
      <button onClick={() => dispatch_games({ type: "end" })}>{ld.formatString(ld.lastPage)}</button>
      <table>
        <thead>
          <tr>
            <th>{ld.formatString(ld.gameIsRunning)}</th>
            <th>{ld.formatString(ld.gameOwner)}</th>
            <th>{ld.formatString(ld.gameParticipants)}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game) => (<tr key={game.id}>
            <td>{game.running}</td>
            <td>{game.owner_name}</td>
            <td>{game.player_count}</td>
          </tr>))}
        </tbody>
      </table>
    </div>);
}

