import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import { CardService } from '../services/card-service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})

export class CardContainerComponent implements OnInit {

  @Input() avatar: string;
  @Input() listCard: any[] = [];
  @Input() cardType: string;

  @Output() evReloadList: EventEmitter<string> = new EventEmitter();

  // cardLoad:Promise<boolean>;
  constructor(private cardService: CardService) { }

  ngOnInit() {
    console.log('init');
    debugger;
    // this.listCard = this.cardService.getListFromType(this.cardType)
    const typePhoto =  ['owner', 'custom', 'addCard'];
    // const typePhoto =  ['owner', 'bathtub', 'custom'];
    if (this.cardType !== 'addCard') {
      this.listCard = this.cardService.getListFromType(this.cardType);
  }
  }

    switchCardType(newCardType) {
      this.cardType = newCardType;
      this.evReloadList.emit('reloadCustomList');
    }

  ngOnDestroy() {
    // this.save()
  }

  saveListCard() {
    console.log('save on server');
    this.cardService.saveListCardToServer(this.cardType);
  }



}
