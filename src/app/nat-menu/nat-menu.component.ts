import { Component, OnInit, Input, Output } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NatCard} from  '../NatCard'
import { CardService } from '../services/card-service';
import { EventEmitter } from 'protractor';
import { Observable } from "rxjs"

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
	loginIsOn = false;

	cardType;
	listCard:any[]=[];
	avatar;
	// listCardKitchen:any[];
	// listCardAddImg =[];

	// @Output() eventChangementLitCard:EventEmitter<any> = new EventEmitter();

	constructor(private cardService:CardService) { }
		
	ngOnInit() {
		this.cardService.getAllListCardFromServer();
		// this.cardService.setCardTest()

	}


	onClicBackHome(){
		this.accueilIsOn = true;
		this.cardIsOn = false;
		this.loginIsOn = false;
		this.cardType = '';
	}

	onClicKitchen(){
		console.log('clic kitchen');
		this.cardType = 'kitchen';
		this.accueilIsOn = false;
		this.cardIsOn = true;
		this.listCard = this.cardService.getListFromType(this.cardType);
		this.avatar = 'kitchen'
		this.loginIsOn = false;

	}


	onClicBathtub(){
		console.log('clic bath');
		this.accueilIsOn = false;
		this.cardIsOn = true;
		// this.listCard = this.listCardBathtub;
		this.avatar = 'bathtub'
		this.loginIsOn = false;
		this.cardType = 'bathtub';
		// debugger;
		this.listCard = this.cardService.getListFromType(this.cardType);
	}

	onClicLogin(){
		this.accueilIsOn = false;
		this.cardIsOn = false;
		this.loginIsOn = true;
		this.listCard = [];
		this.avatar = 'account_box'
		this.cardType = '';
	}

	onClicAddImg(){
		this.accueilIsOn = false;
		this.cardIsOn = true;
		this.loginIsOn = false;
		// this.listCard = this.listCardAddImg;
		this.avatar = 'add_photo_alternate'
		this.cardType = 'custom';

		this.listCard = this.cardService.getListFromType(this.cardType);
		// debugger;
	}

}
