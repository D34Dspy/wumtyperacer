import { Component, Reducer } from "react";
import { createContext, useContext, useReducer } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import "../assets/TypeArea.css";

type TypeAreaProps = {
  text: string;
};

type TypeAreaState = {
  words: string[];
  wordIndex: number;

  input: string;
  letterIndex: number;
  complete: boolean;
};

type TypeAreaAction = {
  type: string;
  content: string;
};

function typeAreaReducer(
  state: TypeAreaState,
  action: TypeAreaAction
): TypeAreaState {
  console.log("hello");
  console.log(state.input);
  console.log(state.letterIndex);
  console.log(action.content);
  const regex = /^.$/;
  switch (action.type) {
    case "char":
      if (action.content === "Backspace") {
        const removeIndex =
          state.letterIndex == state.input.length
            ? state.letterIndex - 1
            : state.letterIndex;
        return {
          ...state,
          input:
            state.input.slice(0, removeIndex) +
            state.input.slice(removeIndex + 1, state.input.length),
          letterIndex: Math.max(0, state.letterIndex - 1),
        };
      } else if (action.content === "CBackspace") {
        return {
          ...state,
          input: "",
          letterIndex: 0,
        };
      } else if (!regex.test(action.content)) return state;

      if (
        state.input === state.words[state.wordIndex] &&
        action.content === " "
      ) {
        const newIndex = state.wordIndex + 1;
        return {
          ...state,
          wordIndex: newIndex,
          input: "",
          letterIndex: 0,
          complete: newIndex >= state.words.length,
        };
      } else {
        const newInput = state.input + action.content;
        const newIndex = state.letterIndex + 1;
        console.log(newIndex);
        return {
          ...state,
          input: newInput,
          letterIndex: newIndex,
        };
      }

    default:
      return state;
  }
}

export default function TypeArea(props: TypeAreaProps) {
  const [content, dispatch] = useReducer(typeAreaReducer, {
    words: props.text.split(" "),
    //words: [""],
    wordIndex: 0,
    input: "",
    letterIndex: 0,
    complete: false,
  });

  const handleInput = (char: string) => {
    dispatch({
      type: "char",
      content: char,
    });
  };

  const splitCurrentWord = () => {
    const supposedWord = content.words[content.wordIndex];
    const inputWord = content.input;

    return [
      inputWord === supposedWord.slice(0, inputWord.length),
      inputWord,
      supposedWord.slice(inputWord.length, supposedWord.length),
    ];
  };

  let cursor;
  if (!content.complete) {
    const [isCorrect, left, right] = splitCurrentWord();
    cursor = (
      <span>
        <label className={isCorrect ? "correct" : "incorrect"}>{left}</label>
        <label className="future next">
          {right + String.fromCharCode(9251)}
        </label>
      </span>
    );
  }

  return (
    <div
      tabIndex={-1}
      id="typeArea"
      className="area"
      onKeyDown={(e) => handleInput((e.ctrlKey ? "C" : "") + e.key)}
    >
      {content.words.slice(0, content.wordIndex).map((word, index) => (
        <label key={index} className="correct next">
          {word + String.fromCharCode(9251)}
        </label>
      ))}

      {cursor}

      {content.words
        .slice(content.wordIndex + 1, content.words.length)
        .map((word, index) => (
          <label key={index} className="future next">
            {word + String.fromCharCode(9251)}
          </label>
        ))}
    </div>
  );
}
