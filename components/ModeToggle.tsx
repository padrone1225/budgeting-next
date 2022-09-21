import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../themes/mode";

const ModeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2 absolute right-0 mr-4 md:mr-0 lg:mr-4">
      {theme === "dark" ? (
        <FaSun
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-2xl cursor-pointer text-slate-700 dark:text-slate-300"
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-2xl cursor-pointer text-slate-700 dark:text-slate-300"
        />
      )}
    </div>
  );
};

export default ModeToggle;
