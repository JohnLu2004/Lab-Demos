import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../ThemeContext";
import "./Lab3.css";

import { getSentenceArray, getWord } from "../fetchFunctions";

const INTERVAL_DELAY: number = 400;
const MAX_LINE_NUMBER: number = 4;

function testSentencing(wordNumber: number): string {
  const testString: string = "This is a test sentence.";
  const split: string[] = testString.split(" ");
  return split[wordNumber];
}

export default function EEGfMRIStudyPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();
  const [sentenceArray, setSentenceArray] = useState<string[]>();

  useEffect(() => {
    getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
      (value: string[] | void) => setSentenceArray(value as string[])
    );
  }, [theme.experiment, theme.lineNumber, theme.list]);

  useEffect(() => {
    setSentenceArray(sentenceArray);
  }, [sentenceArray]);

  const reset = () => {
    setWordNumber(1);
    navigate("/comprehension");
    //update
    setTheme({
      ...theme,
      lineNumber: theme["lineNumber"] + 1,
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => setDisplay(""), 200);
      setWordNumber((wordNumber) => wordNumber + 1);
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, []);

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
      //reset
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
