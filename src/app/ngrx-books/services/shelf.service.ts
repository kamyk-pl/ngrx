import {Injectable} from '@angular/core';
import {Collections, NgRxBook} from '../model/models';
import { timer } from 'rxjs/observable/timer';
import {map} from 'rxjs/operators';

@Injectable()
export class ShelfService {
  books: NgRxBook[] = [];

  constructor() {
    this.books.push(new NgRxBook('Gra o Tron 3', Collections.TO_READ));
    this.books.push(new NgRxBook('Wiedźmin 3', Collections.READING));
    this.books.push(new NgRxBook('Władca Pierscienia 3', Collections.READ));
    this.books.push(new NgRxBook('JS The Good Parts 3', Collections.TO_READ));
    this.books.push(new NgRxBook('Clean Code 3', Collections.READ));
    this.books.push(new NgRxBook('You don\'t know JS 3', Collections.READING));
  }

  
  fetchBooks(){
    return timer(3000).pipe(map(() => this.books));
  }

  addBook(book: NgRxBook) {
    this.books.push(book);
  }
}
