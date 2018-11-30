import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Collections, NgRxBook } from '../model/models';
import { ShelfService } from '../services/shelf.service';
import { NgRxModuleState } from '../store';
import { AddBook, LoadBooks, UpdateBook } from '../store/actions';
import { selectBookItems, selectCollection, selectIsLoading } from '../store/selectors';

/*
Dodałem kilka rzeczy, ktorych nie pokazałem na szkolenie
1. wywaliłem switcha z metody getData do ustawiania this.mode
2. zeby jednak dzialalo to dodalem przyklad jak subskybowac sie do stora i wycigac zmienna ktora potrzebujemy lokalnie 
  (patrz kod w ngInit 72-78). Dopisalem tez kawalek, aby po zmianie mode'a pobraly sie dane
3. dodałem jeden z zalecanych mechanizmow na odsubskrybowanie poprzez
  1) zadeklarowanie lokalnego subjecta on destroy (linia 31)
  2) stworzenie hooka onDestroy (80) plus rozszerzylem sekcje implements naszego komponentu o onDestroy (34)
  3) w tym onDestroy mowie naszemu subjectowi z pkt1) wyslij cokolwiek (81)
  4) cala magia jest tu nasza subskrybcja dziala tylko do czasu az nasz subject cos wysle, tak dzial operator takeUntil...(73), 
  a ze nasz subject wysyla informacje wtedy gdy angular "zabija" komponent...ale tuz przed zabiciem nasza subskrybcja sie automagicznie odsybskrubuje
  proponuje zapamietac ten patern i uzywac, przy KAZDYM subscribie

*/

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.scss']
})
export class BooksShelfComponent implements OnInit, OnDestroy {
  
  destroy$: Subject<any> = new Subject<any>(); /// To jest mechanizm odsubskrybowania sie (1) 
  books$: Observable<NgRxBook[]>;
  isLoading$ = this.store$.pipe(
    select(selectIsLoading)
  )
  collectionTitle$ = this.store$.pipe(
    select(selectCollection),
    map((collection: string) => {
      switch (collection) {
        case Collections.READ: {
          return 'Books already read';
        }
        case Collections.READING: {
          return 'Books currently reading';
        }
        case Collections.TO_READ: {
          return 'Books to read';
        }
        default: {
          return 'All my books';
        }
      }
    })
  )
  title: string;
  mode: Collections | undefined;
  collections = Collections;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shelfService: ShelfService,
    private store$: Store<NgRxModuleState>,
  ) { }

  ngOnInit() {
    this.store$.pipe(
      takeUntil(this.destroy$), /// To jest mechanizm odsubskrybowania sie (4) 
      select(selectCollection),
    ).subscribe((mode)=> {
      this.mode=mode 
      this.getData();
    }); 
  }
  
  ngOnDestroy(): void { /// To jest mechanizm odsubskrybowania sie (2) 
   this.destroy$.next(); /// To jest mechanizm odsubskrybowania sie (3) 
  }

  private getData() {

    this.books$ = this.store$.pipe(
      select(selectBookItems),
      map((books: NgRxBook[]) => this.mode ?
        books.filter((book: NgRxBook) => book.collection === this.mode) :
        books)
    )
  }

  changeCollectionHandler({ book, newCollection }) {
    console.log('Book has changed collection', book, newCollection);
    this.store$.dispatch(new UpdateBook({ ...book, collection: newCollection }))
  }

  loadBooks() {
    this.store$.dispatch(new LoadBooks());
  }

  newBookHandler(newBook) {
    this.store$.dispatch(new AddBook(newBook));
    this.getData();
  }
}
