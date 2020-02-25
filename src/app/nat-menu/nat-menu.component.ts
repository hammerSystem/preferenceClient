import { Component, OnInit, Input, Output } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NatCard} from  '../NatCard'
import { CardService } from '../services/card-service';
import { EventEmitter } from 'protractor';

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
		
	ngOnInit() {}

	// listCardKitchen = [
		// {
		// path: './assets/photo/cuisine1.jpg',
		// title: 'titre photo 1',
		// desc: 'une petite description de la photo 1'
		// }, 
		// {
		// path: './assets/photo/cuisine2.jpg',
		// title: 'titre photo 2',
		// desc: 'une petite description de la photo 2'
		// },
		// {
		// path: './assets/photo/cuisine3.jpg',
		// title: 'titre photo 3',
		// desc: 'une petite description de la photo 3'
		// }
	// ];
	
	// listCardBathtub = [
	// 	{
	// 		path: './assets/photo/salle_bain1.jpg',
	// 		title: 'titre photo 1',
	// 		desc: 'une petite description de la photo 1'
	// 	}, 
	// 	{
	// 		path: './assets/photo/salle_bain2.jpg',
	// 		title: 'titre photo 2',
	// 		desc: 'une petite description de la photo 2'
	// 	},
	// 	{
	// 		path: './assets/photo/salle_bain3.jpg',
	// 		title: 'titre photo 3',
	// 		desc: 'une petite description de la photo 3'
	// 	}
	// ];
	// listCardAddImg =[];
	// 	{
	// 		path: ' ',
	// 		title: '',
	// 		desc: ''
	// 	}
	// ]


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
		// this.eventChangementLitCard.emit(null);
		this.avatar = 'kitchen'
		this.loginIsOn = false;

			
	// 	debugger;
	// 	this.cardService.getListCardsFromServer(this.cardType).subscribe(data => {
	// 	debugger;
	// 	if (data[0])
	// 		// this.article=data[0];
	// 		debugger;
	// 		this.listCard = this.cardService.getListFromType(this.cardType);
	// 		debugger;
	// })

	}


	onClicBathtub(){
		console.log('clic bath');
		this.accueilIsOn = false;
		this.cardIsOn = true;
		// this.listCard = this.listCardBathtub;
		this.avatar = 'bathtub'
		this.loginIsOn = false;
		this.cardType = 'bathtub';
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
