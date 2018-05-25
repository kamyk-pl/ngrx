import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BooksShelfComponent } from './books-shelf/books-shelf.component';
import { BooksOnShelfComponent } from './books-on-shelf/books-on-shelf.component';
import { ShelfService } from './services/shelf.service';
import { BookOnShelfFormComponent } from './book-on-shelf-form/book-on-shelf-form.component';
import { reducersMap } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './store/router-store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
    { path: '',
      redirectTo: '/shelf',
      pathMatch: 'full'
    },{
      path: 'shelf',
      component: BooksShelfComponent,
    }, {
      path: 'shelf/:collection',
      component: BooksShelfComponent,
    }]),
    StoreModule.forRoot(reducersMap),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([BooksEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
  ],
  declarations: [BooksShelfComponent, BooksOnShelfComponent, BookOnShelfFormComponent],
  providers: [
    ShelfService,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ]
})
export class NgrxBooksModule {
}
