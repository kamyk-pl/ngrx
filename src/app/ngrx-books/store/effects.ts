import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, select, Store } from '@ngrx/store';
import { BooksLoaded, LOAD_BOOKS } from './actions';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { ShelfService } from '../services/shelf.service';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { NgrxModuleState } from './index';
import { selectCollection } from './selectors';
import { Collections } from '../model/models';

@Injectable()
export class BooksEffects {
  private collection$: Observable<Collections> = this.store$.pipe(select(selectCollection));
  constructor(
    private actions$: Actions,
    private shelfSvc: ShelfService,
    private store$: Store<NgrxModuleState>,
  ) {}

  @Effect()
  fetchBooks$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_BOOKS),
    concatMap(() => this.shelfSvc.fetchBooks()),
    map(books => new BooksLoaded(books)),
  );

  @Effect()
  fetchBooksOnLoad$: Observable<Action> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    withLatestFrom(this.collection$),
    concatMap(([, collection]) => this.shelfSvc.fetchBooks(collection)),
    map(books => new BooksLoaded(books)),
  );
}
