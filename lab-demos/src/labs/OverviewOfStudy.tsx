import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useTheme } from "../ThemeContext";
import LabInfo from "./lab1/labInfo.json";
export default function OverviewOfStudy() {
  const navigate = useNavigate();
  //const { LabInfo, setLabInfo } = useState();
  const goToInstructionalForm = () => {
    navigate("/instructionalForm");
  };
  return (
    <div className="instructional-text">
      <h1>Overview of Study</h1>
      <h2>{LabInfo.title}</h2>
      <h2>{LabInfo.investigator}</h2>
      <h2>{LabInfo.institution}</h2>
      <h2>Purpose of the Experiment</h2>
      <p>{LabInfo.purpose}</p>
      <h2>Data Collection</h2>
      <p>{LabInfo.dataCollection}</p>
      <h2>Duration</h2>
      <p>
        The experiment is expected to take approximately
        {LabInfo.duration}
        minutes to complete.
      </p>
      <h2>Risks and Benefits</h2>
      <p>{LabInfo.riskAndBenefits}</p>
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
        free to contact {LabInfo.investigator}.
      </p>
      <button className="card" onClick={goToInstructionalForm}>
        Continue
      </button>
    </div>
  );
}
