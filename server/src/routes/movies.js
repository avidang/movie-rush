import express from "express";
import axios from "axios";

import * as config from "../config.js";

const router = express.Router();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: config.TMDB_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const response = await tmdbApi.get("/movie/popular", {
      params: { page, language: "en-US" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

router.get("/airing-now", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const response = await tmdbApi.get("/movie/now_playing", {
      params: { page, language: "en-US" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const response = await tmdbApi.get("/search/movie", {
      params: { query, page, language: "en-US" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await tmdbApi.get(`/movie/${id}`, {
      params: { language: "en-US", append_to_response: "videos" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

export default router;
