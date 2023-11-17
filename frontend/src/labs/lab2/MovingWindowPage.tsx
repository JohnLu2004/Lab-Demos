import { useEffect, useState } from "react";
import "./Lab2.css";
import { useNavigate } from "react-router";

import { useTheme } from "../../ThemeContext";

import { generateSentence, getSentenceArray } from "../fetchFunctions";

export default function MovingWindowPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(-2);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();
  const [sentenceArray, setSentenceArray] = useState<string[]>([]);

  useEffect(() => {
    getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
      (value: string[]) => {
        setSentenceArray(value);
      }
    );
    const interval = setInterval(() => {
      setTimeout(() => setDisplay(""), 200);
      setWordNumber((wordNumber) => wordNumber + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //if they do more than x sentences, send them back
    if (theme["lineNumber"] >= 4) {
      setTheme({
        ...theme,
        lineNumber: -1,
      });
      navigate("/result");
    }

    if (wordNumber >= sentenceArray.length) {
      setTheme({
        ...theme,
        lineNumber: theme["lineNumber"] + 1,
      });
      setWordNumber(0);
      navigate("/comprehension");
    }

    generateSentence(wordNumber, "_", sentenceArray).then((sentence) => {
      setDisplay(sentence);
    });
  }, [wordNumber]);

  return (
    <>
      <div>
        <code className="text">{" " + display + " "}</code>
      </div>
    </>
  );
}
