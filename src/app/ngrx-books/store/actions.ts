import { Action } from "@ngrx/store";
import { NgRxBook } from "../model/models";

export const UPDATE_BOOK= 'BOOKS::UPDATE_BOOK';
export const LOAD_BOOKS= 'BOOKS::LOAD_BOOKS';
export const BOOKS_LOADED= 'BOOKS::BOOKS_LOADED';
export const ADD_BOOK="BOOKS::ADD_BOOK"

export class UpdateBook implements Action{
    public readonly type = UPDATE_BOOK;
    constructor(public payload:NgRxBook){
    } 
}

export class LoadBooks implements Action{
    public readonly type = LOAD_BOOKS;
}

export class BooksLoaded implements Action{
    public readonly type = BOOKS_LOADED;
    constructor(public payload:NgRxBook[]){
    } 
}

export class AddBook implements Action{
    public readonly type = ADD_BOOK;
    constructor(public payload:NgRxBook){
    } 
}