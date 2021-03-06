import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss'],
})
export class SingleAppareilComponent implements OnInit {
  id: number = -1;
  name: string = 'appareil';
  status: string = 'status';

  constructor(
    private appareilService: AppareilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.name = this.appareilService.getAppareilById(+this.id).name;
    this.status = this.appareilService.getAppareilById(+this.id).status;
  }
}
