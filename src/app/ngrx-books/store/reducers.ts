import { Collections, NgRxBook } from '../model/models';
import { Action } from '@ngrx/store';

export interface BooksState {
  items: NgRxBook[];
}

const initialBooksState = {
  items: [
    new NgRxBook('Gra o Tron', Collections.TO_READ),
    new NgRxBook('Wiedźmin', Collections.READING),
    new NgRxBook('Władca Pierscienia', Collections.READ),
    new NgRxBook('JS The Good Parts', Collections.TO_READ),
    new NgRxBook('Clean Code', Collections.READ),
    new NgRxBook('You don\'t know JS', Collections.READING),
  ]
};

export function booksReducer(state: BooksState = initialBooksState, action: Action) {
  console.group('%cBooks reducer:', 'color: orange;');
  console.log(state, action);
  console.groupEnd();
  return state;
}
