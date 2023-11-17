import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../ThemeContext";
import "./Lab3.css";

import { getSentenceArray, getWord } from "../fetchFunctions";

const INTERVAL_DELAY: number = 1000;
const MAX_LINE_NUMBER: number = 4;

export default function EEGfMRIStudyPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("+");
  const { theme, setTheme } = useTheme();
  const [sentenceArray, setSentenceArray] = useState<string[]>(["+"]);

  useEffect(() => {
    getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
      (value: string[] | void) => {
        setSentenceArray(value as string[]);
        const interval = setInterval(() => {
          setWordNumber((wordNumber) => wordNumber + 1);
          //setTimeout(() => setDisplay(""), 100);
        }, INTERVAL_DELAY);
        return () => clearInterval(interval);
      }
    );
  }, [theme.experiment, theme.lineNumber, theme.list]);

  const reset = () => {
    setWordNumber(1);
    navigate("/comprehension");
    //update
    setTheme({
      ...theme,
      lineNumber: theme["lineNumber"] + 1,
    });
  };
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => setDisplay(""), 200);
      setWordNumber((wordNumber) => wordNumber + 1);
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, []);
  */
  useEffect(() => {
    //if they do more than x sentences, send them back
    if (theme["lineNumber"] >= MAX_LINE_NUMBER) {
      setTheme({
        ...theme,
        lineNumber: -1,
      });
      navigate("/result");
    }

    if (wordNumber >= sentenceArray.length) {
      reset();
    }
    getWord(theme.experiment, theme.list, theme.lineNumber, wordNumber).then(
      (word) => setDisplay(word)
    );
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
