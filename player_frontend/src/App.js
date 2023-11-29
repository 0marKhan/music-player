import { Navigate, Route, RouterProvider, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PlaylistHome from "./pages/PlaylistHome";

import "./App.css";

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} exact />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/playlist-home" element={<PlaylistHome />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
