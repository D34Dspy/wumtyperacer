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
  }) : [], [games.page, leaderboard.method, games.pages.length]);

  return ( //<div className="ReactTable">
    <div className="table_box">
      <a className="table-heading-refresh">Sortierung {games.reverse ? "reversed" : "normal"}</a>
      <button className='table-button-refresh' onClick={() => {
        setIsFetched(false)
      }}>{ld.formatString(ld.refresh)}</button>
          <br></br>

      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "toggle" })}>{ld.formatString(ld.reverseSort)}</button>
      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "sortrunning" })}>{ld.formatString(ld.gamesSortRunning)}</button>
      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "sortplayers" })}>{ld.formatString(ld.gamesSortPlayers)}</button>
      <table>
        <thead>
          <tr>
            <th className='table_head'>{ld.formatString(ld.gameIsRunning)}</th>
            <th className='table_head'>{ld.formatString(ld.gameOwner)}</th>
            <th className='table_head'>{ld.formatString(ld.gameParticipants)}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game) => (<tr key={game.id}>
            <td className='table_text'>{game.running}</td>
            <td className='table_text'>{game.owner_name}</td>
            <td className='table_text'>{game.player_count}</td>
          </tr>))}
        </tbody>
      </table>
      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "begin" })}>{ld.formatString(ld.firstPage)}</button>
      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "previous" })}>{ld.formatString(ld.previousPage)}</button>
      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "next" })}>{ld.formatString(ld.nextPage)}</button>

      <button className='table-button-bottom' onClick={() => dispatch_games({ type: "end" })}>{ld.formatString(ld.lastPage)}</button>
    </div>);
}

