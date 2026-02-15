import { apiClient } from '../apiClient';

import { movieDetailSchema } from '@/schemas/movie-detail';

const API_PATH = '/movie';

export const getMovieDetails = async (movieId: number) => {
  const response = await apiClient.get(`${API_PATH}/${movieId}`);
  return movieDetailSchema.parse(response.data);
};
