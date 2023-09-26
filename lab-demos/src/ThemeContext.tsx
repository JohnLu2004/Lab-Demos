// ThemeContext.js
import { createContext, useState, useContext } from "react";

export const ThemeContext = createContext({
  lineNumber: -1,
  experiment: null,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    lineNumber: -1,
    experiment: null,
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
