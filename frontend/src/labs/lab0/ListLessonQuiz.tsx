import "./Lab0.css";
import { useNavigate } from "react-router";
import { ThemeProvider } from "../../ThemeContext";
import { counterBalance } from "../fetchFunctions";

export default function ListLessonQuiz() {
  const navigate = useNavigate();
  const updateOnClick = () => {
    navigate("/result");
  };
  return (
    <>
      <ThemeProvider>
        <button
          className="mx-auto"
          onClick={() => {
            updateOnClick();
          }}
        >
          Return to homepage
        </button>
      </ThemeProvider>
    </>
  );
}
