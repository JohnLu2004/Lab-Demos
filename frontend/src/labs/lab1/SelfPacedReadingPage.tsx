import { useState, useEffect } from "react";
import "./Lab1.css";
import { useNavigate } from "react-router";
import { useTheme, ThemeProvider } from "../../ThemeContext";
import {
  generateSentence,
  getSentenceArray,
  postStatistics,
} from "../fetchFunctions";
export default function SelfPacedReadingPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState<number>(-1);
  const [display, setDisplay] = useState<string>(
    "Click the button to start the trial"
  );
  const { theme, setTheme } = useTheme();
  const [statistics] = useState<Date[]>([]);
  const [sentenceArray, setSentenceArray] = useState<string[]>();

  useEffect(() => {
    getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
      (value: string[] | void) => setSentenceArray(value as string[])
    );
  }, [theme.experiment, theme.lineNumber, theme.list]);
  const updateOnClick = () => {
    setWordNumber((wordNumber) => wordNumber + 1);
    statistics.push(new Date());
    if (sentenceArray) {
      if (wordNumber >= sentenceArray.length) {
        //randomize
        setWordNumber(-1);

        //update

        postStatistics(
          sentenceArray,
          statistics,
          theme.experiment,
          theme.lineNumber
        );

        navigate("/comprehension");
        setTheme({
          ...theme,
          lineNumber: theme["lineNumber"] + 1,
        });
      }
      generateSentence(wordNumber, "_", sentenceArray).then((sentence) =>
        setDisplay(sentence)
      );
    }
  };

  return (
    <>
      <ThemeProvider>
        <div id="">
          <div>
            <code className="text">{display}</code>
          </div>
          <div>
            <button
              className="mx-auto"
              onClick={() => {
                updateOnClick();
              }}
              id="clickForWords"
            ></button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
