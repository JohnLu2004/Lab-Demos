import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { getQuestionAndAnswer } from "./fetchFunctions";
import "./Template.css";

function useInterval(callback, delay: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

export default function ComprehensionForm() {
  const [timer, setTimer] = useState(0);
  const { theme } = useTheme();
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
  const goToLabPage = () => {
    if (theme["experiment"] == "Self-Paced Reading") {
      navigate("/lab1");
    } else if (theme["experiment"] == "Moving Window") {
      navigate("/lab2");
    } else if (theme["experiment"] == "EEG/fMRI Study") {
      navigate("/lab3");
    }
  };

  return (
    <>
      <h1>Comprehension Question</h1>
      <div className="container">
        <div id="countdown"></div>
      </div>
      <div>
        <p>{question}</p>
        <div className="flex">
          <button onClick={goToLabPage}>Yes</button>
          <button onClick={goToLabPage}>No</button>
        </div>
      </div>
    </>
  );
}
