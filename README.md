# BookApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Integrating ngrx


### Step 8

* Go to your reducer and clear items in the initial state,
* Go to `books-shelf.component.html` and hide `div.collection_container` when books are not loaded with `*ngIf`
* Add there a notification that books are loading

### Step 7

* Install `@ngrx/router-store` package
* Extend `NgrxModuleState` to have router key of type `RouterReducerState<RouterStateUrl>` - the `RouterStateUrl` was implemented for you in `store/router-store.ts`
* Import and register `routerReducer` in your present `ActionReducerMap` (suggested key: `router`)
* Wire up `StoreRouterConnectingModule.forRoot({ stateKey: 'router' })` with your module
* Add `{ provide: RouterStateSerializer, useClass: CustomSerializer }` to your module providers. `CustomSerializer` is implemented in `store/router-store.ts`.

### Step 6

* Install `@ngrx/store-devtools`
* Install _in your web browser_ the [Redux Devtools Extension](http://zalmoxisus.github.io/redux-devtools-extension/)
* Wire-up `StoreDevToolsModule.instrument({ maxAge: 25 })` with your module

### Exercise 1

* Implement adding a new book: 
  ** Create `AddBook` action
  ** Handle the action in the reducer
  ** Dispatch the action in `BooksShelfComponent` in appropriate handler

### Step 5

* Remove unused methods from `ShelfService`
* Add `ShelfService.fetchBooks` method that will return books with some delay, 
  to emulate the HTTP request behaviour (maybe use `timer` from `rxjs`)
* Be sure that `ShelfService` returns other titles than in the default state
* Install `@ngrx/effects` package
* Add `LoadBooks` and `BooksLoaded` actions, handle them in the reducer (add `loading: boolean` state)
* Write an effect that reloads books on `LoadBooks` action 
  and emits `BooksLoaded` action 
* Register the effect with `EffectsModule.forRoot`
* Add a button that will dispatch `LoadBooks` action

### Step 4

* Implement `UpdateBook` action that will be dispatched when e.g. moving a book
* Handle updating a book in the reducer:
  * Notice that there's no invariant property, so introduce `id`
  * Assign unique id to a `NgrxBook`, use `uuid` package
  * Handle an update action that carries an `id` 
* Test the reducer (think of it as comparing _state after_ passing an action with _expected state_)
* Dispatch the update action on book move (`BookShelfComponent`)

### Step 3

* Refactor `BooksShelfComponent` to use `| async` instead of subscribing to `books$`
* Extract books selection logic to `store/selectors.ts`, use `createSelector` function,
* Write a unit test for your reducer

### Step 2

* Inject `Store<NgrxModuleState>` to the `BooksShelfComponent`
* Use the store to render books in `BooksShelfComponent`:
  * Stop using the service in `getData`
  * Fetch all books from the store using `select` operator,
  * **Temporarily** subscribe to the store and assign them to the existing `books` field
  * Map the book collection to a filtered one, based on `this.mode` (if set)
  
_Since we're not relying on internal component state anymore, adding books won't work for a while._

### Step 1

* Install `@ngrx/store` package
* Write your first reducer, _HINT_: `(State, Action) => State`
* Add initial, default state to your reducer 
* Wire up the reducer with the module using `StoreModule.forRoot` method and `ActionReducerMap`
