import { useState } from "react";
import "./Lab1.css";
import { useNavigate } from "react-router";
import { useTheme, ThemeProvider } from "../../ThemeContext";
import { generateSentence, getSentenceArray } from "../fetchFunctions";

function test(wordNumber: number) {
  const split: string[] = "This is a test sentence.".split(" ");
  let generated: string = "";
  for (let i = 0; i < split.length; i++) {
    if (i != wordNumber) {
      for (let j = 0; j < split[i].length; j++) {
        generated = generated + "_";
      }
    } else {
      generated = generated + split[i];
    }
    generated = generated + " ";
  }
  return generated;
}
export default function SelfPacedReadingPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();
  const updateOnClick = () => {
    setWordNumber((wordNumber) => wordNumber + 1);
    //if this is the test, then
    if (theme["lineNumber"] == -1) {
      //send them to question if they're done it
      if (wordNumber >= "This is a test sentence.".split(" ").length - 1) {
        //randomizef
        setWordNumber(0);
        setTheme({
          ...theme,
          lineNumber: Math.floor(Math.random() * (1 - 0 + 1)) + 0,
        });
        //update
        setTheme({
          ...theme,
          lineNumber: theme["lineNumber"] + 1,
        });
        if (theme["lineNumber"] == 0) {
          setTheme({
            ...theme,
            experiment: "Self Paced Reading",
          });
          navigate("/comprehension");
        }
      }
      setDisplay(test(wordNumber));
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
              setTheme({
                ...theme,
                lineNumber: Math.floor(Math.random() * (1 - 0 + 1)) + 0,
              });
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
        "_"
      ).then((sentence) => setDisplay(sentence));
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
