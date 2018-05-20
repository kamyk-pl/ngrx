import { Action } from '@ngrx/store';
import { NgRxBook } from '../model/models';

export const UPDATE_BOOK = '[Books] Update';
export const LOAD_BOOKS = '[Books] Load';
export const BOOKS_LOADED = '[Books] Loaded';

export class UpdateBook implements Action {
  public readonly type: string = UPDATE_BOOK;
  constructor(public payload: Partial<NgRxBook>) {}
}

export class LoadBooks implements Action {
  public readonly type: string = LOAD_BOOKS;
}

export class BooksLoaded {
  public readonly type: string = BOOKS_LOADED;
  constructor(public payload: NgRxBook[]) {}
}
