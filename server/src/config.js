import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const PORT = process.env.PORT || 5000;


if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in environment variables");
}

export { TMDB_API_KEY, PORT };
