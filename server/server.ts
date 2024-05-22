import session from "express-session";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import entryRoutes from "./routes/entry";
import userRoutes from "./routes/user";
import passport from "./config/passport-config";

import "./config/db";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "lil_horse",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/entry",  entryRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
