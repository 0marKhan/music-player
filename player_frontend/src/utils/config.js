// if we host it other that localhost:3000 we can just change it from here
export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-backend-bbei.onrender.com"
    : "http://localhost:4000";
