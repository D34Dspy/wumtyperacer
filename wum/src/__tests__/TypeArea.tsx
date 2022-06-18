// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByTestId,
} from "@testing-library/react";
import TypeArea from "../components/TypeArea";

const exampleString: string = "Lorem Ipsum.";

test("typearea completable", async () => {
  let completed = false;

  const completeHandler = () => (completed = true);

  let result = render(
    <TypeArea onComplete={completeHandler} text={exampleString} />
  );

  let target = result.getByTestId("typearea");
  console.log(target);

  await waitFor(() => {
    for (let i = 0; i < exampleString.length; i++) {
      const char = exampleString.charAt(i);
      fireEvent.keyPress(target, { key: char, charCode: char.charCodeAt(0) });
    }
  });

  expect(completed).toBe(true);
});
