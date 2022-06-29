import { useReducer } from "react";

type TypeRecordState = {
  words: string[];
  wordIndex: number;

  input: string;
  letterIndex: number;
  complete: boolean;
};

type TypeRecordAction = {
  type: string;
  content: string;
};

function TypeRecordReducer(
  state: TypeRecordState,
  action: TypeRecordAction
): TypeRecordState {
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

export default (text: string) => useReducer(TypeRecordReducer, {
    words: text.split(" "),
    //words: [""],
    wordIndex: 0,
    input: "",
    letterIndex: 0,
    complete: false,
} )