import { useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

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
  const navigate = useNavigate();
  const listState = useAppSelector(selectList);
  const routePage = useRouterState({
    select: (state) => parsePageFromSearch(state.location.search),
  });
  const hasPageParam = useRouterState({
    select: (state) => hasPageInSearch(state.location.search),
  });

  const handlePageChange = (page: number) => {
    if (listState.isLoading || page === routePage) return;
    navigate({
      to: '.',
      search: (previous) => ({
        ...previous,
        page,
      }),
    });
  };

  useEffect(() => {
    if (!hasPageParam) {
      navigate({
        to: '.',
        search: (previous) => ({
          ...previous,
          page: 1,
        }),
        replace: true,
      });
      return;
    }

    if (listState.isLoading) return;
    if (listState.page === routePage && listState.items.length) return;

    dispatch(fetchAction(routePage));
  }, [
    dispatch,
    fetchAction,
    listState.isLoading,
    listState.items.length,
    listState.page,
    hasPageParam,
    navigate,
    routePage,
  ]);

  if (listState.error) {
    return <div>Error: {listState.error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <MoviesFilterBar title={title} />
      <MoviesGrid
        isLoading={listState.isLoading}
        movies={listState.items}
        currentPage={routePage}
        totalPages={listState.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const parsePageFromSearch = (search: unknown) => {
  if (!search || typeof search !== 'object') return 1;
  const rawPage = (search as Record<string, unknown>).page;
  const parsed = Number(rawPage);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

const hasPageInSearch = (search: unknown) => {
  if (!search || typeof search !== 'object') return false;
  const rawPage = (search as Record<string, unknown>).page;
  return rawPage !== undefined;
};
