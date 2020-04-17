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

  @Output() evReloadList: EventEmitter<string> = new EventEmitter();

  // cardLoad:Promise<boolean>;
  constructor(private cardService: CardService) { }

  ngOnInit() {
    console.log('init');
    debugger;
    // this.listCard = this.cardService.getListFromType(this.cardType)
    const typePhoto =  ['owner', 'custom', 'addCard'];
    // const typePhoto =  ['owner', 'bathtub', 'custom'];
    if (this.cardType != null || this.cardType !== 'addCard' ) {
      this.listCard = this.cardService.getListFromType(this.cardType);
  }
  }

    switchCardType(newCardType) {
      // debugger;
      this.cardType = newCardType;

      this.evReloadList.emit(newCardType);

    }

  // ngOnDestroy() {
  //   debugger;
  //   this.saveListCard();
  //   // this.save()
  // }



  saveListCard() {
    // debugger;
    console.log('save on server');
    this.cardService.saveListCardToServer(this.cardType);

    // tests
  }



}
