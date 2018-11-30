import { booksReducer, BookState } from "./reducers";
import { ActionReducerMap } from "@ngrx/store";
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router-store';

export interface NgRxModuleState {
    books: BookState;
    router: RouterReducerState<RouterStateUrl>;
}

export const reduceMap :ActionReducerMap<NgRxModuleState>  = {
    'books' : booksReducer,
    'router' : routerReducer,
}