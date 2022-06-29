import { useReducer } from "react";

export type State = {
  words: string[];
  wordIndex: number;

  input: string;
  letterIndex: number;
  complete: boolean;
};

type Command = { type: "erase" | "clear" | "backward" | "forward" | "begin" | "end" };
type Content = {
  type: "populate" | "char",
  content: string
};
export type Action = Command | Content;

const clearState = {
    wordIndex: 0,
    input: "",
    letterIndex: 0,
    complete: false,
};

export function erase(str: string, pos: number): string {
  return str.slice(0, pos) + str.slice(pos + 1, str.length);
}

export function insert(str: string, pos: number, c: string): string {
  return str.slice(0, pos) + c + str.slice(pos); // TODO
}

export function replace(str: string, pos: number, c: string): string {
  return insert(erase(str, pos), pos, c);
}

function breakdownState(state: State, action: Action) {
  const { input, words, wordIndex, letterIndex } = state;
  return {
    ...state,
    exceed: input.length === words[wordIndex].length - 1, // is it about to exceed?
    correct: input === words[wordIndex], // is it correct?
    complete: input === words[wordIndex] && wordIndex === input.length - 1, // is it correct and the last?
    type: action.type,
    space: action.type === "char" && action.content === " ",
    boundary: state.letterIndex == 0 || state.letterIndex == words[wordIndex].length - 1,
    currentWord: words[wordIndex],
    insertable: (letterIndex + 1) < (words[wordIndex].length - 1),
    content: action.type === "char" || action.type === "populate" ? (action as Content).content : "",
  }
}

function useWrapper(state: State, action: Action) {
  const { input, words, wordIndex, letterIndex } = state;
  const info = breakdownState(state, action);
  const { exceed, complete } = info;
  return {
    ...info,
    advanceIf: (expr: boolean) => expr ? { wordIndex: wordIndex + 1, input: "", letterIndex: 0, complete: complete } : { complete: complete },
    eraseIf: (expr: boolean) => expr ? { letterIndex: letterIndex - 1, input: erase(input, letterIndex)} : {},
    moveIf: (expr: boolean, offset: number) => expr ? { letterIndex: letterIndex + offset } : {},
    insertIf: (expr: boolean, content: string) => {
      if(expr){
        const newInput = insert(input, letterIndex, content);
        return { input: newInput, complete: newInput === words[wordIndex] && exceed }
      }
      return {};
    },
    replaceIf: (expr: boolean, content: string) => {
      if(expr){
        const newInput = replace(input, letterIndex, content);
        return { input: newInput, complete: newInput === words[wordIndex] && exceed }
      }
      return {};
    }   
  }
}

export function Reducer(
  state: State,
  action: Action
): State {
  const { input, correct, letterIndex, type, space, insertable, content, currentWord, 
    replaceIf, insertIf, advanceIf, eraseIf, moveIf } = useWrapper(state,action);
  switch(type) {
    case "populate":
      return { ...clearState, words: content.split(" ") }
    case "char":
      return { ...state, ...advanceIf(correct && space), ...insertIf(insertable && !space, content), 
        ...replaceIf(!insertable && !space, content), ...moveIf(letterIndex < currentWord.length - 1 , 1) };
    case "erase":
      return { ...state, ...eraseIf(letterIndex != 0)};
    case "clear":
      return { ...state, input: "", letterIndex: 0 }
    case "backward":
      return { ...state, ...moveIf(letterIndex > 0, -1) };
    case "forward":
      return { ...state, ...moveIf(letterIndex < input.length - 1, 1) };
    case "begin":
      return { ...state, letterIndex: 0 };
    case "end":
      return { ...state, letterIndex: Math.max(input.length - 1, 0) };
    default:
      throw `TypeRecord reducer unhandled action ${type}`;
  }
}

export function unwrapEvent() {
 // TODO
}

export function initialize(text: string) {
  return {
    words: text.split(" "),
    ...clearState
  }
}

export default (text: string) => useReducer(Reducer, initialize(text))