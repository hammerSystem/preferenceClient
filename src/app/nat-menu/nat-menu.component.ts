import { Component, OnInit, Input, Output } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import {NatCard} from  '../NatCard';
import { CardService } from '../services/card-service';
import { EventEmitter } from 'protractor';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-nat-menu',
  templateUrl: './nat-menu.component.html',
  styleUrls: ['./nat-menu.component.scss']
})
export class NatMenuComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  accueilIsOn = true;
  cardIsOn = false;
  loginMenuIsOn = false;

  // isLogin = false;

  cardType;
  listCard: any[] = [];
  avatar;
  // listCardKitchen:any[];
  // listCardAddImg =[];

  // @Output() eventChangementLitCard:EventEmitter<any> = new EventEmitter();


  constructor(private cardService: CardService, private loginService: LoginService) { }

  ngOnInit() {
    this.cardService.getAllListCardFromServer();
    // this.cardService.setCardTest();

  }

  eventHandler(event) {
    debugger;
    if (event === 'login') {
      console.log('menu comp: recu de fenetre accueil: login');
      this.loginMenuIsOn = true;
      this.accueilIsOn = false;
      this.onClicMenuLogin();
    } else if (event === 'owner'){
      console.log('menu comp: event = owner');
      this.onClicOwnerCollection()
    } else if (event === 'add'){
      console.log('menu comp: event = add');
      this.onClicAddImg() ;
    }
  }

  onClicBackHome() {
    this.accueilIsOn = true;
    this.cardIsOn = false;
    this.loginMenuIsOn = false;
    this.cardType = '';
  }

  onClicOwnerCollection() {
    console.log('clic owner');

    // a remettre + tard
    // if (this.loginService.isLogin === false) {
    //   alert('Vous êtes pas identifié, identifiez-vous');
    //   this.onClicMenuLogin();
    //   return;
    // }
    this.cardType = 'owner';
    this.accueilIsOn = false;
    this.cardIsOn = true;
    this.listCard = this.cardService.getListFromType(this.cardType);
    this.avatar = 'kitchen';
    this.loginMenuIsOn = false;

  }

  onClicAddImg() {
    // a remettre + tard

    // if (this.loginService.isLogin === false) {
    //   alert('Vous n'êtes pas identifié, identifiez-vous');
    //   this.onClicMenuLogin();
    //   return;
    // }
    this.accueilIsOn = false;
    this.cardIsOn = true;
    this.loginMenuIsOn = false;
    // this.listCard = this.listCardAddImg;
    this.avatar = 'add_photo_alternate';
    this.cardType = 'addCard';

    // this.listCard = this.cardService.getListFromType(this.cardType);
    // debugger;
  }

  onClicCustomList() {
    console.log('clic list client');
    this.accueilIsOn = false;
    this.cardIsOn = true;
    this.avatar = 'list';
    this.loginMenuIsOn = false;
    this.cardType = 'custom';
    this.listCard = this.cardService.getListFromType(this.cardType);
  }

  onClicMenuLogin() {
    this.accueilIsOn = false;
    this.cardIsOn = false;
    this.loginMenuIsOn = true;
    this.listCard = [];
    this.avatar = 'account_box';
    this.cardType = '';
  }



}
