import { useEffect, useState } from "react";
import "./Lab3.css";
import { useNavigate } from "react-router";

import { useTheme } from "../../ThemeContext";
import trialInput from "./TrialInput.json";

function testSentencing(wordNumber: number) {
  const testString: string = "This is a test sentence.";
  const split: string[] = testString.split(" ");
  return split[wordNumber];
}

function generate(lineCondition: number, wordNumber: number) {
  const split: string[] =
    trialInput["1"]["sentences"][lineCondition].split(" ");
  return split[wordNumber];
}

export default function EEGfMRIStudyPage() {
  const navigate = useNavigate();
  const [lineCondition, setLineCondition] = useState(0);
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordNumber((wordNumber) => wordNumber + 1);
    }, 200);
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
        setLineCondition(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
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
      if (
        wordNumber >=
        trialInput["1"]["sentences"][lineCondition].split(" ").length
      ) {
        //randomize
        setWordNumber(0);
        setLineCondition(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
        navigate("/comprehension");
        //update
        setTheme({
          ...theme,
          lineNumber: theme["lineNumber"] + 1,
        });
      }
      setDisplay(generate(lineCondition, wordNumber));
    }
  }, [wordNumber]);
  useEffect(() => {
    setDisplay(generate(lineCondition, wordNumber));
  }, [display]);

  return (
    <>
      <div>
        <code className="text">{display}</code>
      </div>
    </>
  );
}
