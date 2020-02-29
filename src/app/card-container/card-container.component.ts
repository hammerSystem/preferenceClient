import { Component, OnInit, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material'
import { CardService } from '../services/card-service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})

export class CardContainerComponent implements OnInit {
  
  @Input() avatar:string; 
  @Input() listCard:any[] = [];
  @Input() cardType:string;
  
  // cardLoad:Promise<boolean>;
  constructor(private cardService:CardService) { }

  ngOnInit() {
    console.log('init');
    // debugger;
    // this.listCard = this.cardService.getListFromType(this.cardType)
    let typePhoto =  ['kitchen', 'bathtub', 'custom'];
    this.listCard = this.cardService.getListFromType(this.cardType);
  };



  ngOnDestroy(){
    // this.save()
  }

  saveListCard(){
    console.log('save on server');
    this.cardService.saveListCardToServer(this.cardType);
  }

  

}
