import { ActionReducerMap } from '@ngrx/store';
import { BooksState, booksReducer } from './reducers';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router-store';

export interface NgrxModuleState {
  books: BooksState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducersMap: ActionReducerMap<NgrxModuleState> = ({
  books: booksReducer,
  router: routerReducer,
});
