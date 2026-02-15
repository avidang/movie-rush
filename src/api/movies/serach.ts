import { apiClient } from '../apiClient';

import { moviesResultSchema } from '@/schemas/movies-result';

const API_PATH = '/search/movie';

export const searchMovies = async (query: string, page: number) => {
  const response = await apiClient.get(`${API_PATH}`, {
    params: { query, page },
  });
  return moviesResultSchema.parse(response.data);
};
