export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-backend-bbei.onrender.com"
    : "http://localhost:3000";
