import { apiClient } from '../apiClient';

import { moviesResultSchema } from '@/schemas/movies-result';

const API_PATH = '/movie/popular';

export const getPopularMovies = async (page: number) => {
  const response = await apiClient.get(`${API_PATH}`, {
    params: { page },
  });
  return moviesResultSchema.parse(response.data);
};
