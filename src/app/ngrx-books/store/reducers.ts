import { NgRxBook, Collections } from "../model/models";
import { Action } from "@ngrx/store";
import { UPDATE_BOOK, UpdateBook, LOAD_BOOKS, BOOKS_LOADED, BooksLoaded, ADD_BOOK, AddBook } from "./actions";

export interface BookState{
    items: NgRxBook[];
    isLoading: boolean;
}

export const initialState:BookState = {
    items:[],
    isLoading : false,
}

export function booksReducer(
        state:BookState = initialState, 
        action:Action
    ):BookState {
    console.log('Book reducer', action);

    switch(action.type){
        case UPDATE_BOOK : {

            const {payload} = action as UpdateBook;
            const items = state.items
                    .map((book:NgRxBook)=>
                        payload.id === book.id ? {...payload} : book
                    );
            return {
                ...state,
                items
            }
        }
        case LOAD_BOOKS : {
            return {
                ...state,
                isLoading: true,
            }
        }
        case BOOKS_LOADED : {
            const {payload:items} = action as BooksLoaded;
            return {
                ...state,
                items,
                isLoading:false
            }
        }
        case ADD_BOOK : {
            const {payload:book} = action as AddBook;
            const items = [...state.items, book]
            return {
                ...state,
                items,
            }
        }
    }
    return state;
}