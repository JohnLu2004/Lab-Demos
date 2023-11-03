import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { getQuestionAndAnswer, sendAnswer } from "./fetchFunctions";
import "./Template.css";

function useInterval(callback, delay: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

export default function ComprehensionForm() {
  const [timer, setTimer] = useState(0);
  const { theme, setTheme } = useTheme();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useInterval(() => {
    setTimer((prevTimer) => prevTimer + 1);
    const x = document.getElementById("countdown");
    if (x) {
      x.style.width = (100 * (100 - timer)) / 100 + "%";
    }
    if (timer >= 100) {
      goToLabPage();
    }
  }, 30);
  useEffect(() => {
    if (!dataFetched) {
      getQuestionAndAnswer(theme.experiment, theme.list, theme.lineNumber).then(
        (jsonObject) => {
          setQuestion(jsonObject["Question"]);
          setAnswer(jsonObject["Answer"]);
          setDataFetched(true); // Set dataFetched to true to prevent repeated calls
        }
      );
    }
  }, [dataFetched, theme.experiment, theme.list, theme.lineNumber]);
  const navigate = useNavigate();
  const clicked = (answer: string) => {
    sendAnswer(answer, theme.experiment, theme.lineNumber);
    goToLabPage();
  };
  const goToLabPage = () => {
    //if they do more than x sentences, send them back
    if (theme["lineNumber"] >= 4) {
      setTheme({
        ...theme,
        lineNumber: 0,
      });
      navigate("/result");
      return;
    }
    if (theme["experiment"] == "Self-Paced Reading") {
      navigate("/lab1");
    } else if (theme["experiment"] == "Moving Window") {
      navigate("/lab2");
    } else if (theme["experiment"] == "EEG/fMRI Study") {
      navigate("/lab3");
    }
  };

  return (
    <div id="page">
      <div className="align-middle">
        <h1>Comprehension Question</h1>
        <div className="container">
          <div id="countdown"></div>
        </div>
        <div>
          <p>{question}</p>
          <div className="flex justify-center">
            <button onClick={() => clicked("yes")}>Yes</button>
            <button onClick={() => clicked("no")}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
