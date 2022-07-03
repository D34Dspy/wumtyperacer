import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import useLeaderboard from '../core/Leaderboard'
import { useUnmapper } from '../core/Pages';
import Cfg from '../core/Config';
import '../assets/table.css'

export default function Leaderboard() {
    const language = useLanguageContext();
    const [isFetched, setIsFetched] = useState(false);
    const [leaderboard, dispatch] = useLeaderboard();

    if (isFetched === false) {
        Cfg.get("/players/",
            (players) => dispatch({ type: "populate", content: players.map((player: any) => {
                return {
                    id: player["id"],
                    name: player["name"],
                    best_score: player["bestPoints"],
                    best_cpm: player["bestCharsPerSecond"],
                }
            }) }),
            (response) => {
                console.log(response);
                throw "unable to acquire players";
            });
        setIsFetched(true);
    }

    const data = React.useMemo(() => leaderboard.pages.length > 0 ? leaderboard.pages[leaderboard.page].indices.map(useUnmapper(leaderboard.content)) : [], [isFetched, leaderboard.page, leaderboard.pages.length]);

    console.log(leaderboard)
    console.log(data)

    return ( //<div className="ReactTable">
        <div className="table_box">
            <button onClick={() => {
                setIsFetched(false)
            }}>{ld.formatString(ld.refresh)}</button>
            <button onClick={() => dispatch({ type: "next" })}>{ld.formatString(ld.nextPage)}</button>
            <button onClick={() => dispatch({ type: "previous" })}>{ld.formatString(ld.previousPage)}</button>
            <button onClick={() => dispatch({ type: "begin" })}>{ld.formatString(ld.firstPage)}</button>
            <button onClick={() => dispatch({ type: "end" })}>{ld.formatString(ld.lastPage)}</button>
            <table>
                <thead>
                    <tr>
                        <th>{ld.formatString(ld.playerName)}</th>
                        <th>{ld.formatString(ld.playerCPM)}</th>
                        <th>{ld.formatString(ld.playerScore)}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((player) => (<tr key={player.id}>
                        <td>{player.name}</td>
                        <td>{player.best_cpm}</td>
                        <td>{player.best_score}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>);
}