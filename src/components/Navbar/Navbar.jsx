import { Typography, Stack, IconButton, useMediaQuery } from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Navbar() {
  const { handleMobileMenu } = useOutletContext();
  const isMobile = useMediaQuery("(max-width:800px)");
  const { setMode, mode } = useContext(ThemeContext);

  return (
    <header>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          py: { xs: 1, md: 2 },
          px: { xs: 2, md: 3 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {isMobile && (
          <IconButton
            onClick={() => handleMobileMenu((prev) => !prev)}
            sx={{ color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h1"
          component="h1" 
          sx={{
            fontFamily: "Ubuntu, sans-serif",
            fontSize: { xs: 20, md: 28 },
            fontWeight: 700,
            color: mode === "light" ? "#9785BA" : "#D7C7F4",
            textDecoration: "none",
            flexGrow: 1,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Bot AI
        </Typography>

        <IconButton
          sx={{ color: "text.primary" }}
          onClick={() => {
            setMode((prev) => {
              if (prev === "light") {
                return "dark";
              } else {
                return "light";
              }
            });
          }}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Stack>
    </header>
  );
}
