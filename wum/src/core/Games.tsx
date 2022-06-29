import { useReducer, useState } from "react";
import usePageContext, { PageContainer, Page, usePages, useSortedMapping, useMapping, useCompareDevice } from './Pages'

type Entry = {
  "id": 0,
  "running": false,
  "currentWord": number,
  "players": number [],
  "owner": number,
  "winner": number,
  "points": number []
};

type SortCallback = (a: Entry, b: Entry) => number;
const SortMapping: { [key: string]: SortCallback } = {
    "sortrunning": useCompareDevice("running"),
    "reverse_sortrunning": useCompareDevice("running", true),
    "sortplayers": useCompareDevice((player: Entry) => player.players.length),
    "reverse_sortplayers": useCompareDevice((player: Entry) => player.players.length),
}

type State = {
    content: Entry[],
    pages: Page[],
    page: number,
    initialized: boolean,
    reverse: boolean,
    method: string,
};

type SortTypes = "sortrunning" | "sortplayers" | "sortname" | "nosort";
type NavTypes = "next" | "previous" | "begin" | "end";
type ControlTypes = "toggle" | "populate";

type PopulateAction = {
    type: "populate";
    content: Entry[],
}
type Action = { type: SortTypes | NavTypes | ControlTypes } | PopulateAction;

const DefaultSort = "sortscore";
const PageSize = 8;

function Reducer(
    state: State,
    action: Action
): State {

    var type: string = action.type;

    if (action.type === "populate") {
        const { content } = action as PopulateAction;
        state.content = content;
        type = state.method;
    } else if (action.type === "toggle") {
        type = state.method;
        state.reverse = !state.reverse;
    }

    const { content, reverse } = state;

    const pc = usePageContext(state as PageContainer);

    switch (type) {
        case "nosort":
            return {
                ...state,
                pages: usePages(useMapping(content), PageSize),
                page: 0
            }
        case "sortrunning":
        case "sortplayers":
            return {
                ...state,
                pages: usePages(useSortedMapping(content, SortMapping[`${reverse ? "reverse_" : ""}${type}`]), PageSize),
                page: 0
            };
        case "next":
            return { ...state, ...pc.next().unwrap()};
        case "previous":
            return { ...state, ...pc.previous().unwrap()};
        case "begin":
            return { ...state, ...pc.begin().unwrap()};
        case "end":
            return { ...state, ...pc.end().unwrap()};
        default:
            console.log("unhandled " + type);
            return state;
    }
}

export default () => useReducer(Reducer, {
    content: [],
    pages: [],
    page: -1,
    initialized: false,
    reverse: false,
    method: DefaultSort,
})
