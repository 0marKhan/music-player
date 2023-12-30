require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

require("dotenv").config();

const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:3001", "https://music-player.com"],
  })
); //allowing the backend to work with the frontend
// converts arriving bodies of data into json for expres
app.use(express.json());

// connecting mongodb to node app
// takes two arguments
// (1) which db we're connecting to (db url)
// (2) connection options
mongoose
  .connect(
    "mongodb+srv://khan:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.1y3qzle.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// setup for passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKey";
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port: " + port);
});
