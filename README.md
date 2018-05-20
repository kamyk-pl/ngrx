# BookApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Integrating ngrx

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
