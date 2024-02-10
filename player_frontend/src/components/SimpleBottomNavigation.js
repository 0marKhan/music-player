import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./SimpleBottomNavigation.css";
import { Link } from "react-router-dom";

const SimpleBottomNavigation = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#161616",
      },
      primary: {
        main: "#e30085",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const [value, setValue] = React.useState(0);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let navWidth = width;

  if (
    width === 414 ||
    width === 390 ||
    width === 430 ||
    width === 412 ||
    width === 360
  ) {
    navWidth = width;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: navWidth }} className="bottom-nav-mobile">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/home" style={{ textDecoration: "none" }}>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          </Link>
          <Link to="/search-songs" style={{ textDecoration: "none" }}>
            <BottomNavigationAction label="Search" icon={<SearchIcon />} />
          </Link>
          <Link to="/liked-songs">
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          </Link>
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
};

export default SimpleBottomNavigation;
