import axios from 'axios';

import { config } from '@/config';

export const apiClient = axios.create({
  baseURL: config.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
