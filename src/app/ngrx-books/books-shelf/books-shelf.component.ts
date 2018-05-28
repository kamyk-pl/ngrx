import { Component, OnInit } from '@angular/core';
import { Collections, NgRxBook } from '../model/models';
import { ShelfService } from '../services/shelf.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgrxModuleState } from '../store';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { selectBookItems, selectCollection } from '../store/selectors';
import { AddBook, LoadBooks, UpdateBook } from '../store/actions';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.scss']
})
export class BooksShelfComponent implements OnInit {
  books$: Observable<NgRxBook[]>;
  title: string;
  mode$: Observable<Collections | undefined>;
  collections = Collections;
  private destroySubj: Subject<boolean> = new Subject();
  destroy$: Observable<boolean> = this.destroySubj.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shelfService: ShelfService,
    private store$: Store<NgrxModuleState>,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getData();
    });
  }

  private getData() {
    this.mode$ = this.store$.pipe(
      select(selectCollection)
    );

    this.books$ = this.store$
      .pipe(
        select(selectBookItems),
      );

    this.mode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(mode => {
        switch (mode) {
          case Collections.READ: {
            this.title = 'Books already read';
            return;
          }
          case Collections.READING: {
            this.title = 'Books currently reading';
            return;
          }
          case Collections.TO_READ: {
            this.title = 'Books to read';
            return;
          }
          default: {
            this.title = 'All my books';
          }
        }
      });
  }

  changeCollectionHandler({book, newCollection}) {
    this.store$.dispatch(new UpdateBook({
      ...book,
      collection: newCollection,
    }));
  }

  newBookHandler(newBook) {
    this.store$.dispatch(new AddBook(newBook));
  }

  loadBooks() {
    this.store$.dispatch(new LoadBooks());
  }
}
