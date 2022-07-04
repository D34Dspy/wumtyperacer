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
        console.log("hello")
        Cfg.get("/players/",
            (players) => dispatch({
                type: "populate", content: players.map((player: any) => {
                    return {
                        id: player["id"],
                        name: player["name"],
                        best_score: player["bestPoints"],
                        best_cpm: player["bestCharsPerSecond"],
                    }
                })
            }),
            (response) => {
                console.log(response);
                throw "unable to acquire players";
            });
        setIsFetched(true);
    }

    const data = React.useMemo(() => leaderboard.pages.length > 0 ? leaderboard.pages[leaderboard.page].indices.map(useUnmapper(leaderboard.content)) : [],
        [isFetched, leaderboard.method, leaderboard.page, leaderboard.pages.length, leaderboard.reverse]);

    console.log(leaderboard)
    console.log(data)

    return ( //<div className="ReactTable">
        <div className="table_box">

            <a className="table-heading-refresh">Sortierung {leaderboard.reverse ? "reversed" : "normal"}</a>
            <button className='table-button-refresh' onClick={() => {
                setIsFetched(false)
            }}>{ld.formatString(ld.refresh)}</button>
            <br></br>

            <button className='table-button-bottom' onClick={() => dispatch({ type: "toggle" })}>{ld.formatString(ld.reverseSort)}</button>
            <button className='table-button-bottom' onClick={() => dispatch({ type: "sortname" })}>{ld.formatString(ld.playersSortName)}</button>
            <button className='table-button-bottom' onClick={() => dispatch({ type: "sortcpm" })}>{ld.formatString(ld.playersSortCPM)}</button>
            <button className='table-button-bottom' onClick={() => dispatch({ type: "sortscore" })}>{ld.formatString(ld.playersSortScore)}</button>
            <table className='tablesos'>
                <thead>
                    <tr>
                        <th className='table_head'>{ld.formatString(ld.playerName)}</th>
                        <th className='table_head'>{ld.formatString(ld.playerCPM)}</th>
                        <th className='table_head'>{ld.formatString(ld.playerScore)}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((player, i) => (<tr key={i}>
                        <td className='table_text'>{player.name}</td>
                        <td className='table_text'>{player.best_cpm}</td>
                        <td className='table_text'>{player.best_score}</td>
                    </tr>))}
                </tbody>
                </table>
                <button className='table-button-bottom' onClick={() => dispatch({ type: "begin" })}>{ld.formatString(ld.firstPage)}</button>
                <button className='table-button-bottom' onClick={() => dispatch({ type: "previous" })}>{ld.formatString(ld.previousPage)}</button>
            <button className='table-button-bottom' onClick={() => dispatch({ type: "next" })}>{ld.formatString(ld.nextPage)}</button>
            <button className='table-button-bottom' onClick={() => dispatch({ type: "end" })}>{ld.formatString(ld.lastPage)}</button>
            
        </div>);
}