// ThemeContext.js
import { createContext, useState, useContext } from "react";

type ThemeContextValue = {
  theme: {
    list: number;
    lineNumber: number;
    experiment: string; // You might want to specify the actual type here
  };
  setTheme: (theme: {
    list: number;
    lineNumber: number;
    experiment: string; // Specify the actual type here
  }) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState({
    list: 1,
    lineNumber: -1,
    experiment: "",
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue | undefined => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
