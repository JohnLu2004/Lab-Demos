import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getStatistics } from "./fetchFunctions";
import { useTheme } from "../ThemeContext";
import "./Template.css";

export default function ResultsPage() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getStatistics(theme.experiment).then((jsonData) => {
      setResults(jsonData);
    });
  }, []);

  const goToLabPage = () => {
    navigate("/");
  };

  return (
    <div id="page">
      <h1 className="text-4xl">Your Results</h1>
      <div className="align-middle">
        <div id="results">
          {Object.values(results).map((array) => (
            <>
              {array.map((object, index) => (
                <div>
                  <h2 className="text-2xl">Trial {index}</h2>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>Words</td>
                        {Object.values(object["sentenceArray"]).map((word) => (
                          <td>{word as string}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Your Time</td>
                        {Object.values(object["timeArray"]).map((gap) => (
                          <td>{gap as string}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Avg Time</td>
                        {Object.values(object["averageTimeArray"]).map(
                          (gap) => (
                            <td>{gap as string}</td>
                          )
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <p>Answer:{object["answer"]}</p>
                  <br />
                  <br />
                </div>
              ))}
            </>
          ))}
        </div>
        <button className="mx-auto" onClick={goToLabPage}>
          Return Home
        </button>
      </div>
    </div>
  );
}
