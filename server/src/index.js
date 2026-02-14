import express from "express";
import cors from "cors";
import moviesRouter from "./routes/movies.js";
import * as config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});
