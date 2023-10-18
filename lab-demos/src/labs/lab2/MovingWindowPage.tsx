import { useEffect, useState } from "react";
import "./Lab2.css";
import { useNavigate } from "react-router";

import { useTheme } from "../../ThemeContext";

import { generateSentence, getSentenceArray } from "../fetchFunctions";

function testSentencing(wordNumber: number) {
  const testString: string = "This is a test sentence.";
  const split: string[] = testString.split(" ");
  let wholeString: string = "";
  for (let i = 0; i < split.length; i++) {
    if (i != wordNumber) {
      for (let j = 0; j < split[i].length; j++) {
        wholeString = wholeString + " ";
      }
    } else {
      wholeString = wholeString + split[i];
    }
    wholeString = wholeString + " ";
  }
  return wholeString;
}

export default function MovingWindowPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => setDisplay(""), 200);
      setWordNumber((wordNumber) => wordNumber + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //if this is the test, then
    if (theme["lineNumber"] == -1) {
      //send them to question if they're done it
      const test: string = "This is a test sentence.";
      if (wordNumber >= test.split(" ").length - 1) {
        //randomize
        setWordNumber(0);
        //update
        setTheme({
          ...theme,
          lineNumber: theme["lineNumber"] + 1,
        });
        if (theme["lineNumber"] == 0) {
          navigate("/comprehension");
        }
      }
      setDisplay(testSentencing(wordNumber));
    } else {
      //if they do more than x sentences, send them back
      if (theme["lineNumber"] >= 4) {
        setTheme({
          ...theme,
          lineNumber: -1,
        });
        navigate("/");
      }
      getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
        (sentenceArray) => {
          if (Array.isArray(sentenceArray)) {
            if (wordNumber >= sentenceArray.length) {
              //randomize
              setWordNumber(0);
              navigate("/comprehension");
              //update
              setTheme({
                ...theme,
                lineNumber: theme["lineNumber"] + 1,
              });
            }
          }
        }
      );
      generateSentence(
        theme.experiment,
        theme.list,
        theme.lineNumber,
        wordNumber,
        " "
      ).then((sentence) => setDisplay(sentence));
    }
  }, [wordNumber]);
  useEffect(() => {
    setDisplay(display);
  }, [display]);

  return (
    <>
      <div>
        <code className="text">{display}</code>
      </div>
    </>
  );
}
