import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LOAD_BOOKS, BOOKS_LOADED, BooksLoaded } from "./actions";
import { concatMap, map } from "rxjs/operators";
import { ShelfService } from "../services/shelf.service";
import { NgRxBook } from "../model/models";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";

@Injectable()
export class BooksEffects{

    constructor(private actions$:Actions,
        private shelfService: ShelfService){
    }

    @Effect()
    loadBooks$ = this.actions$.pipe(
        ofType(LOAD_BOOKS,ROUTER_NAVIGATION),
        concatMap(()=> this.shelfService.fetchBooks()),
        map((books:NgRxBook[]) => new BooksLoaded(books))
    )
}