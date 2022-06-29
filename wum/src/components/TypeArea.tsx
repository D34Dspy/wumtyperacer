import React from 'react';
import { Component, Reducer } from "react";
import { createContext, useContext, useReducer } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import "../assets/TypeArea.css";
import useTypeRecord from '../core/TypeRecord';

type TypeAreaProps = {
  text: string;
};


export default function TypeArea(props: TypeAreaProps) {
  const [content, dispatch] = useTypeRecord(props.text);

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
