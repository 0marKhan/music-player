import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PlaylistHome from "./pages/PlaylistHome";
import LoggedInHome from "./pages/LoggedInHome";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";

import "./App.css";

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token);
  return (
    <>
      {cookie.token ? (
        <Routes>
          <Route path="/home" element={<LoggedInHome />} />
          <Route path="/playlist/:playlistId" element={<PlaylistHome />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/home" element={<LoggedInHome />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
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
