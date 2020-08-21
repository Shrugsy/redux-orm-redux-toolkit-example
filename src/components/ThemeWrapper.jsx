import React, { useState, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@material-ui/icons/Brightness2TwoTone";

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const ThemeWrapper = ({ children }) => {
  const prefersDark = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );
  const [darkMode, setDarkMode] = useState(prefersDark);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div
        className={"theme-toggle" + (darkMode ? " dark" : "")}
        onClick={toggleTheme}
      >
        <CSSTransition
          appear
          in={!darkMode}
          unmountOnExit
          timeout={0}
          classNames="light-mode"
        >
          <WbSunnyTwoToneIcon />
        </CSSTransition>
        <CSSTransition
          appear
          in={darkMode}
          unmountOnExit
          timeout={0}
          classNames="dark-mode"
        >
          <Brightness2TwoToneIcon />
        </CSSTransition>
      </div>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
