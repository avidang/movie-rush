import axios from 'axios';

import { config } from '@/config';

const BASE_URL = 'https://api.themoviedb.org/3';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: config.tmdbApiKey,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});
