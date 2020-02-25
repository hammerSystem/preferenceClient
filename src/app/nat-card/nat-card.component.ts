import { Component, OnInit, Input } from '@angular/core';
import { NatCard} from '../natCard'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CardService } from '../services/card-service';


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

    @Input() path:string;
    @Input() index:number;
    @Input() title:string;
    @Input() desc:string;
    @Input() avatar:string;
    @Input() cardType:string;
    @Input() like:boolean = false;
		@Input() comment:string = '';
    
    // color_like_but = "black";

  constructor(private cardService:CardService) { }


  ngOnInit() {
  }
// saveComment(){
//   console.log('save')
// }

onClickLike(){
  debugger;
	console.log('like');
	if (!this.like){
		this.like = true;
	}else{
		this.like = false;
  };
  this.saveACard();
}
  
saveACard(){
    console.log("saveComment");
    debugger;
    this.cardService.saveACard(this.cardType, this.index, this.like, this.comment);

  }





}
