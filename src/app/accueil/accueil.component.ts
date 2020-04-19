import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  @Input() loginMenuIsOn: boolean;
  @Output() evClicLogin: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onClickLogin() {
    this.loginMenuIsOn = true;
    this.evClicLogin.emit('login');
    // console.log('clic login dans fen accueil');
  }
}

