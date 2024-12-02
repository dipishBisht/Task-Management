import express from "express";
import cors from "cors";
import { connectToDB } from "./config/db";
import { MONGO_URL_LOCAL, PORT } from "./config/env";
import { checkIsAuthenticated } from "./middlewares/auth";
import authRouter from "./routes/auth";
import projectRouter from "./routes/project";

const app = express();

// # cors for cross origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// # express.json for to get json data
app.use(express.json());

// # to connect to db
connectToDB(MONGO_URL_LOCAL);

// # auth router
app.use("/auth", authRouter);

// # project router
app.use("/project", checkIsAuthenticated, projectRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
