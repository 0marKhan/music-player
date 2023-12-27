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
import SearchSong from "./pages/SearchSong";

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  // sound played is initially null because we arent playing any song
  const [soundPlayed, setSoundPlayed] = useState(null);
  // initially tru because we arent playing any song and its paused
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      {cookie.token ? (
        <songContext.Provider
          value={{
            currentSong,
            setCurrentSong,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
          }}
        >
          <Routes>
            {/* for context */}

            <Route path="/home" element={<LoggedInHome />} />
            <Route path="/playlist/:playlistId" element={<PlaylistHome />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/search-songs" element={<SearchSong />} />
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
