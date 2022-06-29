import React from 'react';
import { useLanguageContext, LanguageDef as ld } from "../core/Localization";
import useGames from "../core/Games";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from 'react-table'
import Cfg from '../core/Config';
import { useTargetUnmapper } from '../core/Pages';
import "react-table/react-table.css";
import { getDefaultFormatCodeSettings } from 'typescript';

type LogoutEvent = () => void;
type LogoutProps = {
  onLogout: LogoutEvent;
};

export default function Games(props: LogoutProps) {
  const [games, dispatch] = useGames();
    const language = useLanguageContext();
    ld.setLanguage(language);
    const [isFetched, setIsFetched] = useState(false);

    /*
  "id": 0,
  "running": false,
  "currentWord": number,
  "players": number [],
  "owner": number,
  "winner": number,
  "points": number []
    */
       

    const data = React.useMemo(() => games.content, []);
const columns = React.useMemo(
  () => [
    {
      Header: 'Currently Running',
      accessor: useTargetUnmapper(games.content, 'running'),
    },
    {
      Header: 'Owner',
      accessor: useTargetUnmapper(games.content, 'owner'), // TODO show name
    },
    {
      Header: 'Players',
      accessor: useTargetUnmapper(games.content, (game: any) => game.players.length), 
    },
  ],
  []
);
     

   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

    useEffect(() => {
        if (!isFetched) {
            console.log("fetching leaderboard");
            Cfg.get("/games/",
                (games) => dispatch({ type: "populate", content: games }),
                (response) => {
                    console.log(response);
                    throw "unable to acquire players";
                });
            setIsFetched(true);
        }
    });

  return (
    <div className="log_box">
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>

<thead>

  {headerGroups.map(headerGroup => (

    <tr {...headerGroup.getHeaderGroupProps()}>

      {headerGroup.headers.map(column => (

        <th

          {...column.getHeaderProps()}

          style={{

            borderBottom: 'solid 3px red',

            background: 'aliceblue',

            color: 'black',

            fontWeight: 'bold',

          }}

        >

          {column.render('Header')}

        </th>

      ))}

    </tr>

  ))}

</thead>

<tbody {...getTableBodyProps()}>

  {rows.map(row => {

    prepareRow(row)

    return (

      <tr {...row.getRowProps()}>

        {row.cells.map(cell => {

          return (

            <td

              {...cell.getCellProps()}

              style={{

                padding: '10px',

                border: 'solid 1px gray',

                background: 'papayawhip',

              }}

            >

              {cell.render('Cell')}

            </td>

          )

        })}

      </tr>

    )

  })}

</tbody>

</table>
    </div>
  );
}

