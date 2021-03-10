import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  singInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  singOutUser() {
    firebase.default.auth().signOut();
  }
}
