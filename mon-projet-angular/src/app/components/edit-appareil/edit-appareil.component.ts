import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppareilService } from 'src/app/services/appareil.service';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss'],
})
export class EditAppareilComponent implements OnInit {
  defaultOnOff = 'eteint';
  constructor(
    private appareilService: AppareilService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.appareilService.addAppareil(name, status);
    this.route.navigate(['/appareils']);
  }
}
