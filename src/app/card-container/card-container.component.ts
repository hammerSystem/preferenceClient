import { Component, OnInit, Input, Output, EventEmitter, HostListener  } from '@angular/core';
import {MatButtonModule} from '@angular/material';
import { CardService } from '../services/card-service';
// import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})

export class CardContainerComponent implements OnInit {

  @Input() avatar: string;
  @Input() listCard: any[] = [];
  @Input() cardType: string;
  @Input() listActiveTitle = '';

  @Output() evReloadList: EventEmitter<string> = new EventEmitter();

  // cardLoad:Promise<boolean>;
  constructor(private cardService: CardService) { }

  ngOnInit() {
    // const typePhoto =  ['owner', 'custom', 'addCard'];
    if (this.cardType != null || this.cardType !== 'addCard' ) {
      this.listCard = this.cardService.getListFromType(this.cardType);
    }
  }

  eventHandler(cardType) {
    debugger;
    this.switchCardType(cardType);
  }

    switchCardType(newCardType) {
      debugger;
      this.cardType = newCardType;
      this.switchListActiveTitle(newCardType);
      this.listCard = this.cardService.getListFromType(newCardType);
      this.evReloadList.emit(newCardType);
    }
    switchListActiveTitle(cardType) {
      if (cardType === 'custom') {
        this.listActiveTitle = 'Votre liste';
      } else if (cardType === 'owner') {
        this.listActiveTitle = 'ADN & Cuisines';
      }
    }

  ngOnDestroy() {
    debugger;
    alert('destryo container');
    this.saveListCardType('custom');
    // this.saveListCard();
    // // this.save()
  }

  saveListCardType(cardType) {
    this.cardService.saveListCardToServer(cardType);

    // tests
  }

  saveListCard() {
    debugger;
    console.log('container: call Cardservice save on server. typeCard');
    console.log(this.cardType);
    this.cardService.saveListCardToServer(this.cardType);

    // tests
  }



}
