import { Injectable } from '@angular/core';
import { Collections, NgRxBook } from '../model/models';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShelfService {
  books: NgRxBook[] = [];

  constructor() {
    this.books.push(new NgRxBook('Game of Thrones', Collections.TO_READ));
    this.books.push(new NgRxBook('The Witcher', Collections.READING));
    this.books.push(new NgRxBook('Lord of the Rings', Collections.READ));
    this.books.push(new NgRxBook('JS: The Good Parts', Collections.TO_READ));
    this.books.push(new NgRxBook('Clean Code', Collections.READ));
    this.books.push(new NgRxBook('You don\'t know JS', Collections.READING));
  }

  fetchBooks(collection?: Collections): Observable<NgRxBook[]> {
    return timer(3000)
      .pipe(
        map(() => collection ?
          this.books.filter(book => book.collection === collection) :
          this.books
        )
      );
  }

  addBook(book: NgRxBook): void {
    this.books.push(book);
  }
}
