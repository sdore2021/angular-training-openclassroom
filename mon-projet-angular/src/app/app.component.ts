import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubcription: Subscription;

  constructor() {}
  ngOnInit() {
    const counter = interval(1000);
    this.counterSubcription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('completed subscribing');
      }
    );
  }

  ngOnDestroy() {
    this.counterSubcription.unsubscribe();
  }
}
