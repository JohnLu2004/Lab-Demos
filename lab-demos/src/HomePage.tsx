import { useNavigate } from "react-router";
import { useTheme } from "./ThemeContext";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const goToLab = (ele: HTMLElement | null) => {
    const experiment: string = ele.textContent || ele.innerText;
    const substring: string = experiment.substring(7, experiment.length);
    console.log(substring);
    setTheme({
      ...theme,
      experiment: substring,
    });
    navigate("/overview");
  };
  return (
    <>
      <h1>Welcome to Neurolinguistics Lab Demos!</h1>

      <button
        id="Lab 0"
        onClick={() => goToLab(document.getElementById("Lab 0"))}
      >
        Lab 0: List Lesson
      </button>

      <button
        id="Lab 1"
        onClick={() => goToLab(document.getElementById("Lab 1"))}
      >
        Lab 1: Self-Paced Reading
      </button>
      <button
        id="Lab 2"
        onClick={() => goToLab(document.getElementById("Lab 2"))}
      >
        Lab 2: Moving Window
      </button>
      <button
        id="Lab 3"
        onClick={() => goToLab(document.getElementById("Lab 3"))}
      >
        Lab 3: EEG/fMRI Study
      </button>
    </>
  );
}

export default HomePage;
