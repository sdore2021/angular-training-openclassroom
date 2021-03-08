import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../../services/appareil.service';

@Component({
  selector: 'app-appareil-veiw',
  templateUrl: './appareil-veiw.component.html',
  styleUrls: ['./appareil-veiw.component.scss'],
})
export class AppareilVeiwComponent implements OnInit, OnDestroy {
  isAuth = false;
  color = 'text-danger';
  appareilOne = 'Televiseur';
  appareilTwo = 'Congelateur';
  appareilThree = 'frigo';

  appareils: any[];
  appareilSubcription: Subscription;

  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
      this.color = 'text-success';
    }, 4000);
  }

  ngOnInit() {
    // this.appareils = this.appareilService.appareils;
    this.appareilSubcription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumeAll() {
    this.appareilService.switchOnAll();
  }
  onEteintAll() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onfetch() {
    this.appareilService.getAppareilFromServer();
  }

  getColor() {
    if (this.isAuth) return 'red';
    else return 'yellow';
  }

  ngOnDestroy() {
    this.appareilSubcription.unsubscribe();
  }
}
