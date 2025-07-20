import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getThemePallete } from "./context/getThemePallete";
import { Grid } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [mode, setMode] = useLocalStorage('theme', 'light');
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  const contextValue = useMemo(() => ({
    mode,
    setMode
  }), [mode, setMode]);

  const outletContext = useMemo(() => ({
    chat,
    setChat,
    handleMobileMenu: setMenuOpen,
  }), [chat, setChat]);

  const handleMenuClose = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid
            container
            sx={{
              background:
                "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
            }}
          >
            <Grid
              item
              xs={12}
              md={2.5}
              sx={{
                bgcolor: "primary.light",
                "@media (max-width:800px)": {
                  width: "70%",
                  transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 400ms ease",
                },
              }}
              position={{ xs: "fixed", md: "relative" }}
              height={"100vh"}
              zIndex={{ xs: 9999, md: 1 }}
              boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
            >
              <Sidebar setChat={setChat} closeMenu={handleMenuClose} />
            </Grid>
            <Grid item xs={12} md={9.5}>
              <Outlet context={outletContext} />
            </Grid>
          </Grid>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
