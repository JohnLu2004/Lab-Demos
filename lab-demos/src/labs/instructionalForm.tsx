import { useNavigate } from "react-router";
import "./lab1/Lab1.css";
import LabInfo from "./lab1/labInfo.json";
import { useTheme } from "../ThemeContext";

export default function InstructionalForm() {
  const navigate = useNavigate();
  const {theme} = useTheme();
  const goToLab = () => {
    if (theme["experiment"] == "Self Paced Reading") {
      navigate("/lab1");
    } else if (theme["experiment"] == "Moving Window") {
      navigate("/lab2");
    } else if (theme["experiment"] == "EEG/fMRI Study") {
      navigate("/lab3");
    }
  };
  return (
    <div className="instructional-text">
      <h1>Instructional Form</h1>
      <h2>Procedure</h2>
      <p>{LabInfo.procedure}</p>
      <button className="card" onClick={goToLab}>
        The first attempt will be a test run
      </button>
    </div>
  );
}