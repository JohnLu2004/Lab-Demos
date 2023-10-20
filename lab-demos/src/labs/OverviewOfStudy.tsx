import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import "./Template.css";
export default function OverviewOfStudy() {
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
  });
  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append("experiment", theme.experiment);
    const url = `http://localhost:5000/getLabInfo?${queryParams.toString()}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
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
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  const goToInstructionalForm = () => {
    navigate("/instructionalForm");
  };
  return (
    <div className="instructional-text">
      <h1>Overview of Study</h1>
      <h2>{labInfo.title}</h2>
      <h2>{labInfo.investigator}</h2>
      <h2>{labInfo.institution}</h2>
      <h2>Purpose of the Experiment</h2>
      <p>{labInfo.purpose}</p>
      <h2>Data Collection</h2>
      <p>{labInfo.dataCollection}</p>
      <h2>Duration</h2>
      <p>
        The experiment is expected to take approximately
        {" " + labInfo.duration + " "}
        minutes to complete.
      </p>
      <h2>Risks and Benefits</h2>
      <p>{labInfo.riskAndBenefits}</p>
      <h2>Confidentiality</h2>
      <p>
        Your personal information will remain confidential. We will not collect
        any personally identifiable information during the experiment. Data will
        be analyzed collectively, and individual responses will not be shared.
      </p>
      <h2>Volunter Participation</h2>
      <p>
        Participation in this experiment is entirely voluntary, and you may
        withdraw at any time without penalty. If you choose to withdraw, your
        data will not be included in the analysis.
      </p>
      <h2>Questions and Concerns</h2>
      <p>
        If you have any questions or concerns about the experiment, please feel
        free to contact {labInfo.investigator}.
      </p>
      <button className="card" onClick={goToInstructionalForm}>
        Continue
      </button>
    </div>
  );
}
