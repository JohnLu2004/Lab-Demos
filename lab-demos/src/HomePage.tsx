import { useNavigate } from "react-router";
import { useTheme } from "./ThemeContext";

function HomePage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const goToLab1 = () => {
    setTheme({
      ...theme,
      experiment: "Self Paced Reading",
    });
    navigate("/overview");
  };
  const goToLab2 = () => {
    setTheme({
      ...theme,
      experiment: "Moving Window",
    });
    navigate("/overview");
  };
  const goToLab3 = () => {
    setTheme({
      ...theme,
      experiment: "EEG/fMRI Study",
    });
    navigate("/overview");
  };
  return (
    <>
      <h1>Welcome to Neurolinguistics Lab Demos!</h1>
      <div>
        <button onClick={goToLab1}>Lab 1: Self Paced Reading</button>
      </div>
      <div>
        <button onClick={goToLab2}>Lab 2: Moving Window</button>
      </div>
      <div>
        <button onClick={goToLab3}>Lab 3: EEG/fMRI Study</button>
      </div>
    </>
  );
}

export default HomePage;
