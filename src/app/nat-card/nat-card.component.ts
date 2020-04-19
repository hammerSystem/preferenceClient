import { Component, OnInit, Input } from '@angular/core';
import { NatCard} from '../natCard';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CardService } from '../services/card-service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-nat-card',
  templateUrl: './nat-card.component.html',
  styleUrls: ['./nat-card.component.scss']
})
export class NatCardComponent implements OnInit {

  // maCard = {
  //   path:"../assets/photo/armoire1.jpg",
  //   title:"titre photo 1",
  //   desc:"une petite description de la photo"
  //   }

    @Input() path: string;
    @Input() index: number;
    @Input() title: string;
    @Input() desc: string;
    @Input() avatar: string;
    @Input() cardType: string;
    @Input() like = false;
    @Input() comment = '';
    @Input() fileType = '';

    // color_like_but = "black";

  constructor(private cardService: CardService, public loginService: LoginService) { }


  ngOnInit() {
  }


//   onClickLike() {
//   // debugger;

//   if (!this.like) {
//     this.like = true;
//   } else {
//     this.like = false;
//   }
//   this.saveACard();
// }

  AddCardToCustomList() {
    // console.log('add cvard to custom list');
    this.cardService.addCardToList('custom', this.path, this.title, this.like, this.comment, this.desc, this.fileType);
    this.cardService.deleteACard(this.cardType, this.index, false);
  }

  saveACard() {
    // console.log('saveComment');
    // debugger;
    this.cardService.saveACard(this.cardType, this.index, this.like, this.comment);

  }

  deleteACard() {
    this.cardService.deleteACard(this.cardType, this.index, true);
  }





}
