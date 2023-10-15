import { useNavigate } from "react-router";
import "./lab1/Lab1.css";
import { useTheme } from "../ThemeContext";
import { useState, useEffect } from "react";

export default function InstructionalForm() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [labInfo, setlabInfo] = useState({
    title: "",
    investigator: "",
    institution: "",
    purpose: "",
    dataCollection: "",
    duration: "",
    riskAndBenefits: "",
    procedure: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append("experiment", theme.experiment);
    const url = `http://localhost:5000/getLabInfo?${queryParams.toString()}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // The 'data' variable now contains the JSON response
        setlabInfo({
          ...labInfo,
          title: data.title,
          investigator: data.investigator,
          institution: data.institution,
          purpose: data.purpose,
          dataCollection: data.dataCollection,
          duration: data.duration,
          riskAndBenefits: data.riskAndBenefits,
          procedure: data.procedure,
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
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
      <p>{labInfo.procedure}</p>
      <button className="card" onClick={goToLab}>
        The first attempt will be a test run
      </button>
    </div>
  );
}
