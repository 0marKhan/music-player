import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PlaylistHome from "./pages/PlaylistHome";
import LoggedInHome from "./pages/LoggedInHome";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";
import songContext from "./contexts/songContext";

import "./App.css";
import { useState } from "react";

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      {cookie.token ? (
        <songContext.Provider value={{ currentSong, setCurrentSong }}>
          <Routes>
            {/* for context */}

            <Route path="/home" element={<LoggedInHome />} />
            <Route path="/playlist/:playlistId" element={<PlaylistHome />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/home" element={<LoggedInHome />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </songContext.Provider>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
