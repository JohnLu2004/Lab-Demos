import { useNavigate } from "react-router";
import { useTheme } from "./ThemeContext";
import { getLabs } from "./labs/fetchFunctions";
import "./HomePage.css";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const goToLab = (ele: HTMLElement | null) => {
    const experiment: string = ele?.textContent || ele?.innerText;
    const substring: string = experiment.substring(7, experiment.length);
    setTheme({
      ...theme,
      experiment: substring,
    });
    navigate("/overview");
  };
  useEffect(() => {
    getLabs().then((value) => {
      const labs: string[] = value.items;
      const buttonsDiv = document.getElementById("buttons");
      if (buttonsDiv) {
        buttonsDiv.innerHTML = "";
        labs.forEach((labName) => {
          const button = document.createElement("button");
          button.id = labName;
          button.innerText = labName;
          button.className = "mx-auto";
          button.addEventListener("click", () =>
            goToLab(document.getElementById(labName))
          );
          buttonsDiv.appendChild(button);
        });
      } else {
        console.error("Could not find buttons div");
      }
    });
  });
  return (
    <>
      <div>
        <h1 className="text-4xl font-extrabold">Welcome to Neurolinguistics Lab Demos!</h1>
        <div id="buttons"></div>
      </div>
    </>
  );
}
