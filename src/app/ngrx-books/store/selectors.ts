import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './reducers';
import { NgRxBook } from '../model/models';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-store';

export const selectBooksState = createFeatureSelector('books');
export const selectRouterState = createFeatureSelector('router');

export const selectBookItems = createSelector(
  selectBooksState,
  (booksState: BooksState): NgRxBook[] => booksState.items
);
export const selectCollection = createSelector(
  selectRouterState,
  (router: RouterReducerState<RouterStateUrl>) => {
  try {
    return router.state.params.collection;
  } catch (e) {
    return undefined;
  }
});
