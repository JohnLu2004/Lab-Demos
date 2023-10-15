import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../ThemeContext";
import "./Lab3.css";

const INTERVAL_DELAY: number = 400;
const MAX_LINE_NUMBER: number = 4;

function testSentencing(wordNumber: number): string {
  const testString: string = "This is a test sentence.";
  const split: string[] = testString.split(" ");
  return split[wordNumber];
}

async function getSentenceArray(
  experiment: string,
  list: number,
  lineNumber: number
) {
  const queryParams = new URLSearchParams();
  queryParams.append("experiment", experiment);
  const stringList: string = list.toString();
  queryParams.append("list", stringList);
  const stringLineNumber: string = lineNumber.toString();
  queryParams.append("lineNumber", stringLineNumber);
  const url = `http://localhost:5000/getStimuli?${queryParams.toString()}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/plain",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server errror");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      return data.split(" ");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function getWord(
  experiment: string,
  list: number,
  lineNumber: number,
  wordNumber: number
) {
  const sentenceArray = await getSentenceArray(experiment, list, lineNumber);
  if (Array.isArray(sentenceArray)) {
    return sentenceArray[wordNumber];
  } else {
    // Handle the case where getSentenceArray failed (e.g., due to a fetch error)
    console.error("Failed to get sentence array");
    return "Error"; // Or some other default value
  }
}

export default function EEGfMRIStudyPage() {
  const navigate = useNavigate();
  const [wordNumber, setWordNumber] = useState(0);
  const [display, setDisplay] = useState("Click the button to start the trial");
  const { theme, setTheme } = useTheme();
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
    //if this is the test, then
    if (theme["lineNumber"] === -1) {
      //send them to question if they've done it
      const test: string = "This is a test sentence.";
      if (wordNumber >= test.split(" ").length - 1) {
        //reset
        reset();
        if (theme["lineNumber"] === 0) {
          navigate("/comprehension");
        }
      }
      setDisplay(testSentencing(wordNumber));
    } else {
      //if they do more than x sentences, send them back
      if (theme["lineNumber"] >= MAX_LINE_NUMBER) {
        setTheme({
          ...theme,
          lineNumber: -1,
        });
        navigate("/");
      }
      getSentenceArray(theme.experiment, theme.list, theme.lineNumber).then(
        (sentenceArray) => {
          if (wordNumber >= sentenceArray.length) {
            //reset
            reset();
          }
        }
      );
      getWord(theme.experiment, theme.list, theme.lineNumber, wordNumber).then(
        (word) => setDisplay(word)
      );
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
