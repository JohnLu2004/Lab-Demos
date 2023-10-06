import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import trialInput from "./lab1/TrialInput.json";
import { useTheme } from "../ThemeContext";

function useInterval(callback, delay: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

export default function ComprehensionForm() {
  const [timer, setTimer] = useState(0);
  const { theme } = useTheme();

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
  const navigate = useNavigate();
  const goToLabPage = () => {
    if (theme["experiment"] == "Self Paced Reading") {
      navigate("/lab1");
    } else if (theme["experiment"] == "Moving Window") {
      navigate("/lab2");
    } else if (theme["experiment"] == "EEG/fMRI Study") {
      navigate("/lab3");
    }
    console.log(theme["experiment"]);
  };

  return (
    <>
      <h1>Comprehension Question</h1>
      <div className="container">
        <div id="countdown"></div>
      </div>
      <div>
        <p>{trialInput["1"]["comprehensionQuestion"]}</p>
        <div className="flex">
          <button onClick={goToLabPage}>Yes</button>
          <button onClick={goToLabPage}>No</button>
        </div>
      </div>
    </>
  );
}
