import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../lib/useLocalStorage";

const ThemeContext = createContext<any>("");

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>("light");
  const [colorTheme, setColorTheme] = useLocalStorage<string>(
    "color-theme",
    theme
  );

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    setColorTheme(rawTheme);
  };

  useEffect(() => {
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      setTheme("dark");
    } else {
      setTheme(colorTheme);
    }
  }, []);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
