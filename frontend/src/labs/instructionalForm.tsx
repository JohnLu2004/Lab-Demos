import { useNavigate } from "react-router";
import { useTheme } from "../ThemeContext";
import { useState, useEffect } from "react";
import "./Template.css";

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
    if (theme["experiment"] == "List Lesson") {
      navigate("/lab0");
    } else if (theme["experiment"] == "Self-Paced Reading") {
      navigate("/lab1");
    } else if (theme["experiment"] == "Moving Window") {
      navigate("/lab2");
    } else if (theme["experiment"] == "EEG/fMRI Study") {
      navigate("/lab3");
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold">Instructional Form</h1>
      <h2 className="text-2xl text-left">Procedure</h2>
      <p className="text-left">{labInfo.procedure}</p>
      <button className="mx-auto" onClick={goToLab}>
        The first attempt will be a test run
      </button>
    </div>
  );
}
