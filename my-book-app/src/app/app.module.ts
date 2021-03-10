import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SingupComponent } from './auth/singup/singup.component';
import { SinginComponent } from './auth/singin/singin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';

const routes: Routes = [
  { path: 'auth/signup', component: SingupComponent },
  { path: 'auth/signin', component: SinginComponent },
  {
    path: 'books',
    canActivate: [AuthGuardService],
    component: BookListComponent,
  },
  {
    path: 'books/new',
    canActivate: [AuthGuardService],
    component: BookFormComponent,
  },
  {
    path: 'books/view/:id',
    canActivate: [AuthGuardService],
    component: SingleBookComponent,
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' },
];

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    SinginComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuardService, AuthService, BooksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
