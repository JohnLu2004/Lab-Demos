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
    <>
      <h1 className="text-4xl font-bold">Overview of Study</h1>
      <div id="overview">
        <h2 className="text-2xl">{labInfo.title}</h2>
        <h2 className="text-2xl">{labInfo.investigator}</h2>
        <h2 className="text-2xl">{labInfo.institution}</h2>
        <h2 className="text-2xl">Purpose of the Experiment</h2>
        <p className=" text-align: left;">{labInfo.purpose}</p>
        <br />
        <h2 className="text-2xl">Data Collection</h2>
        <p>{labInfo.dataCollection}</p>
        <br />
        <h2 className="text-2xl">Duration</h2>
        <p>
          The experiment is expected to take approximately
          {" " + labInfo.duration + " "}
          minutes to complete.
        </p>
        <br />
        <h2 className="text-2xl">Risks and Benefits</h2>
        <p>{labInfo.riskAndBenefits}</p>
        <br />
        <h2 className="text-2xl">Confidentiality</h2>
        <p>
          Your personal information will remain confidential. We will not
          collect any personally identifiable information during the experiment.
          Data will be analyzed collectively, and individual responses will not
          be shared.
        </p>
        <br />
        <h2 className="text-2xl">Volunter Participation</h2>
        <p>
          Participation in this experiment is entirely voluntary, and you may
          withdraw at any time without penalty. If you choose to withdraw, your
          data will not be included in the analysis.
        </p>
        <br />
        <h2 className="text-2xl">Questions and Concerns</h2>
        <p>
          If you have any questions or concerns about the experiment, please
          feel free to contact {labInfo.investigator}.
        </p>
      </div>
      <button className="mx-auto" onClick={goToInstructionalForm}>
        Continue
      </button>
    </>
  );
}
