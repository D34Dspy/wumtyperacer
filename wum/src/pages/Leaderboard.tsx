import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import useLeaderboard from '../core/Leaderboard'
import { useUnmapper } from '../core/Pages';
import Cfg from '../core/Config';

export default function Leaderboard() {
    const language = useLanguageContext();
    const [isFetched, setIsFetched] = useState(false);

    const [leaderboard, dispatch] = useLeaderboard(true);

    if (leaderboard.initialized === false) {
        Cfg.get("/players/",
            (players) => dispatch({ type: "populate", content: players }),
            (response) => {
                console.log(response);
                throw "unable to acquire players";
            });

    }

    const data = React.useMemo(() => leaderboard.pages.length > 0 ? leaderboard.pages[leaderboard.page].indices.map(useUnmapper(leaderboard.content)) : [], [leaderboard.page, leaderboard.pages.length]);

    return (<div className="ReactTable">
        <button onClick={() => {
            dispatch({
                type: "invalidate",
            });
        }}>refresh</button>
        <table>
            <thead>
                <td>{ld.formatString(ld.playerName)}</td>
                <td>{ld.formatString(ld.playerCPM)}</td>
                <td>{ld.formatString(ld.playerScore)}</td>
            </thead>
            <tbody>
                {data.map((player) => (<tr>
                    <td>
                        {player.name}
                    </td>
                    <td>
                        {player.best_cpm}
                    </td>
                    <td>
                        {player.best_score}
                    </td>
                </tr>))}
            </tbody>
        </table>
    </div>);
}