import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

//import pages
import HomePage from "./HomePage";
import OverviewOfStudy from "./labs/OverviewOfStudy";
import InstructionalForm from "./labs/instructionalForm";
import ComprehensionForm from "./labs/ComprehensionForm";
import SelfPacedReadingPage from "./labs/lab1/SelfPacedReadingPage";
import MovingWindowPage from "./labs/lab2/MovingWindowPage";
import EEGfMRIStudyPage from "./labs/lab3/EEGfMRIStudyPage";

import { ThemeProvider } from "./ThemeContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<HomePage />} />
      <Route path="overview" element={<OverviewOfStudy />} />
      <Route path="instructionalForm" element={<InstructionalForm />} />
      <Route path="comprehension" element={<ComprehensionForm />} />
      <Route path="lab1" element={<SelfPacedReadingPage />} />
      <Route path="lab2" element={<MovingWindowPage />} />
      <Route path="lab3" element={<EEGfMRIStudyPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
