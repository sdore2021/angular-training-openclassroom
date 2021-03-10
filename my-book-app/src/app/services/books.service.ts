import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books.slice());
  }

  saveBooks() {
    firebase.default.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.default
      .database()
      .ref('/books')
      .on('value', (data: firebase.default.database.DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase.default
        .database()
        .ref('/books/' + id)
        .once('value')
        .then(
          (data: firebase.default.database.DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createNewBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const removeIndexBook = this.books.findIndex((bookEl) => {
      if (bookEl === book) {
        return true;
      }
    });
    this.books.splice(removeIndexBook, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
