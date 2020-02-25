import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../services/card-service';


@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  @Input() title: string;
  @Input() path: string;
  expand_more=false;
  // @Input() description:string;

  constructor(private cardService:CardService) { }

  ngOnInit() {
  }

  OnClickHelp(){
    console.log('help');
    if (this.expand_more==false){
      this.expand_more=true;
    }
    else{
      this.expand_more=false;
    }
  }

  saveNewCard(){
    console.log('on save ajout');

    this.cardService.addCardToList('custom', this.path, this.title, '')
    this.clearNewCard();
  }

  clearNewCard(){
    this.title = '';
    this.path = '';
  }

}
