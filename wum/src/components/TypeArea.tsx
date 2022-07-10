import React from 'react';
import { Component, Reducer } from "react";
import { createContext, useContext, useReducer } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import "../assets/TypeArea.css";
import useTypeRecord, { unwrapEvent } from '../core/TypeRecord';

type TypeAreaProps = {
  text: string;
};


export default function TypeArea(props: TypeAreaProps) {
  const [content, dispatch] = useTypeRecord(props.text);

  const splitCurrentWord = () => {
    const supposedWord = content.words[content.wordIndex];
    const inputWord = content.input;

    if (inputWord.length == 0)
      return [false, "", supposedWord];

    return [
      inputWord === supposedWord.slice(0, inputWord.length),
      inputWord,
      supposedWord.slice(inputWord.length, supposedWord.length),
    ];
  };

  let cursor;
  if (!content.complete) {
    const [isCorrect, content, future] = splitCurrentWord();
    if (future !== undefined) {
      cursor = (
        <span>
          <label className={isCorrect ? "correct" : "incorrect"}>{content}</label>
          <label className="future next">
            {future + String.fromCharCode(9251)}
          </label>
        </span>
      );
    }
  }
  console.log(content.complete)

  return (
    <div
      tabIndex={-1}
      id="typeArea"
      className="area"
      onKeyUp={(e) => {
        const event = unwrapEvent(e);
        if(event.type !== "none")
          dispatch(unwrapEvent(e))
      }}>
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
