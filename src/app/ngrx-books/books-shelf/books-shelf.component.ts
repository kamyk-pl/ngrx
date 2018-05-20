import {Component, OnInit} from '@angular/core';
import { Collections, NgRxBook } from '../model/models';
import {ShelfService} from '../services/shelf.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgrxModuleState } from '../store';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { selectBookItems } from '../store/selectors';

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.scss']
})
export class BooksShelfComponent implements OnInit {
  books$: Observable<NgRxBook[]>;
  title: string;
  mode: Collections | undefined;
  collections = Collections;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shelfService: ShelfService,
    private store$: Store<NgrxModuleState>,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Router params', params);
      this.mode = params.collection;
      this.getData();
    });
  }

  private getData() {
    this.books$ = this.store$
      .pipe(
        select(selectBookItems),
        map((bookItems: NgRxBook[]) => this.mode ?
          bookItems.filter(book => book.collection === this.mode) :
          bookItems
        )
      );

    switch (this.mode) {
      case Collections.READ : {
        this.title = 'Books already read';
        break;
      }
      case Collections.READING : {
        this.title = 'Books currently reading';
        break;
      }
      case Collections.TO_READ : {
        this.title = 'Books to read';
        break;
      }
      default: {
        this.title = 'All my books';
      }
    }
  }

  changeCollectionHandler({book, newCollection}) {
    console.log('Book has changed collection', book, newCollection);
  }

  newBookHandler(newBook) {
    this.shelfService.addBook(newBook);
    this.getData();
  }
}
