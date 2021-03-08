import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
  appareilSubject = new Subject<any[]>();
  private appareils = [
    // les données sont stocker sur le server firebase
    /*{
      id: 1,
      name: 'machine a laver',
      status: 'eteint',
    },
    {
      id: 2,
      name: 'radio de maison',
      status: 'allumer',
    },
    {
      id: 3,
      name: 'reveil of moday',
      status: 'eteint',
    },*/
  ];

  constructor(private httpClient: HttpClient) {}

  saveAppareilsToServer() {
    this.httpClient
      .put(
        'https://angular-training-4c2d2-default-rtdb.firebaseio.com/appareils.json',
        this.appareils
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('terminer la sauvegarde');
        }
      );
  }

  getAppareilFromServer() {
    this.httpClient
      .get<any[]>(
        'https://angular-training-4c2d2-default-rtdb.firebaseio.com/appareils.json'
      )
      .subscribe(
        (reponse) => {
          this.appareils = reponse;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('get form server complited');
        }
      );
  }

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }
  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumer';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'eteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumer';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'eteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find((s) => {
      return s.id === id;
    });
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
}
