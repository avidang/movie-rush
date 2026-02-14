import { useEffect } from 'react';

import { MoviesGrid } from './MoviesGrid';
import { MoviesFilterBar } from './MoviesFilterBar';

import type { MoviesAction } from '@/store/movies/actions';
import type { RootState } from '@/store';
import type { MoviesListState } from '@/store/movies/types';
import { useAppDispatch, useAppSelector } from '@/store';

type SelectList = (state: RootState) => MoviesListState;

type FetchAction = (page: number) => MoviesAction;

interface MoviesListPageProps {
  title: string;
  selectList: SelectList;
  fetchAction: FetchAction;
}

export const MoviesListPage = ({
  title,
  selectList,
  fetchAction,
}: MoviesListPageProps) => {
  const dispatch = useAppDispatch();
  const listState = useAppSelector(selectList);

  const canLoadMore =
    listState.totalPages > 0 && listState.page < listState.totalPages;

  const isLoadingMore = listState.isLoading && listState.items.length > 0;

  const loadMore = () => {
    if (!canLoadMore || listState.isLoading) return;

    dispatch(fetchAction(listState.page + 1));
  };

  useEffect(() => {
    if (listState.items.length) return;

    dispatch(fetchAction(1));
  }, [dispatch, fetchAction, listState.items.length]);

  if (listState.error) {
    return <div>Error: {listState.error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <MoviesFilterBar title={title} />
      <MoviesGrid
        isLoading={listState.isLoading}
        movies={listState.items}
        hasMore={canLoadMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};
