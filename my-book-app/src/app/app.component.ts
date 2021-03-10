import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-book-app';
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyDuxfnxOjhUfuXFAq8XxqdjOl9CnVoPTR0',
      authDomain: 'bookshevlefirebase.firebaseapp.com',
      projectId: 'bookshevlefirebase',
      storageBucket: 'bookshevlefirebase.appspot.com',
      messagingSenderId: '556106365345',
      appId: '1:556106365345:web:187670037c220f9f31f3e0',
      measurementId: 'G-9FDWX4MVHE',
    };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    firebase.default.initializeApp(firebaseConfig);
    //firebase.default.analytics();
    //firebase.analytics();
  }
}
