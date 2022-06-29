import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import useLeaderboard from '../core/Leaderboard'
import { useMapper } from '../core/Pages';
import Cfg from '../core/Config';

export default function Leaderboard() {
    const [leaderboard, dispatch] = useLeaderboard();
    const language = useLanguageContext();
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            console.log("fetching leaderboard");
            Cfg.get("/players/",
                (players) => dispatch({ type: "populate", content: players }),
                (response) => {
                    console.log(response);
                    throw "unable to acquire players";
                });
            setIsFetched(true);
        }
    });

    return (
        <div className="log_box">
            <table>
                {useMapper(leaderboard.content, leaderboard, (p) => {
                    console.log(p);
                    return <tr>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.best_cpm}</td>
                        <td>{p.best_score}</td>
                    </tr>
                })}
            </table>
            <button onClick={() => setIsFetched(false)}>refresh</button>
            <br />
        </div>
    );
}