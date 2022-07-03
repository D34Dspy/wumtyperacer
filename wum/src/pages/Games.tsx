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

const games_mock = [{
  "id": 0,
  "running": false,
  "currentWord": 0,
  "players": [0, 1, 2, 3],
  "owner": 0,
  "winner": 0,
  "points": []

}, {
  "id": 1,
  "running": true,
  "currentWord": 4,
  "players": [4, 5, 6],
  "owner": 5,
  "winner": 0,
  "points": []
}];

const players_mock = [
  "nigger",
  "hello",
  "world",
  "fuck you",
  "haha",
  "melvin",
].map((name, i) => {
  return {
    id: i,
    name: name,
    best_cpm: 0,
    best_score: 0,
  }
});

export default function Games(props: GamesProps) {
  let _ = props;
  const language = useLanguageContext();
  ld.setLanguage(language);

  const [leaderboard, dispatch_leaderboard] = useLeaderboard(true);
  const [games, dispatch_games] = useGames();

  if (leaderboard.initialized === false) {
    Cfg.get("/players/",
      (players) => dispatch_leaderboard({ type: "populate", content: players }),
      (response) => {
        console.log(response);
        throw "unable to acquire players";
      });

  }
  if (games.initialized === false) {
    Cfg.get("/games/",
      (games) => dispatch_games({ type: "populate", content: games }),
      (response) => {
        console.log(response);
        throw "unable to acquire games";
      });
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

  return 
  (<div className="ReactTable">
      <button onClick={() => {
        dispatch_leaderboard({
          type: "invalidate",
        });
        dispatch_games({
          type: "invalidate",
        });
      }}>refresh</button>
      <table>
        <thead>
          <td>{ld.formatString(ld.gameIsRunning)}</td>
          <td>{ld.formatString(ld.gameOwner)}</td>
          <td>{ld.formatString(ld.gameParticipants)}</td>
        </thead>
        <tbody>
          {data.map((game) => (<tr>
            <td>
              {game.running}
            </td>
            <td>
              {game.owner_name}
            </td>
            <td>
              {game.player_count}
            </td>
            <td>
              <button onClick={() => props.onJoin(game.id)}>join</button>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>);
}

