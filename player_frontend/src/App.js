import { Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LoggedInHome from "./pages/LoggedInHome";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";

import PlaylistPage from "./pages/PlaylistPage";
import songContext from "./contexts/songContext";
import "./App.css";
import { useState } from "react";
import SearchSong from "./pages/SearchSong";
import LikedSongs from "./pages/LikedSongs";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  // sound played is initially null because we arent playing any song
  const [soundPlayed, setSoundPlayed] = useState(null);
  // initially tru because we arent playing any song and its paused
  const [isPaused, setIsPaused] = useState(true);
  // eslint-disable-next-line no-unused-vars
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
            <Route path="/songs" element={<Songs />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
            <Route path="/search-songs" element={<SearchSong />} />
            <Route
              path="/playlist-page/:playlistId"
              element={<PlaylistPage />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </songContext.Provider>
      ) : (
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
