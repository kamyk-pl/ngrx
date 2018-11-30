import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "./reducers";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./router-store";

export const selectBookState = createFeatureSelector('books');
export const selectRouterState = createFeatureSelector('router');
export const selectBookItems = createSelector(
 selectBookState, ((state:BookState)=> state.items)   
);
export const selectIsLoading = createSelector(
    selectBookState, ((state:BookState)=> state.isLoading)   
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