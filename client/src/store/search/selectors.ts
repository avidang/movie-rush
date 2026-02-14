import type { RootState } from '@/store/rootReducer';

export const selectSearch = (state: RootState) => state.search;
