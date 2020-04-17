import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardService } from '../services/card-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-search-client-list-img',
  templateUrl: './search-client-list-img.component.html',
  styleUrls: ['./search-client-list-img.component.scss']
})
export class SearchClientListImgComponent implements OnInit {

  constructor(private cardService: CardService, private loginService: LoginService) { }

  clientSelect = {name : 'Aucun'};

  listClient = [];

  @Output() evChangeMenu: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    debugger;
    this.listClient = this.cardService.getListClient();
    debugger;
  }

  onClickClient(index) {
    console.log('click client');
    debugger;
    // const clientNameSelect = this.listClient[index].name;
    // // this.clientSelect = this.loginService.getUserFromName(clientNameSelect);
    // this.loginService.setUser(this.clientSelect, true);

    this.clientSelect = this.listClient[index];
    this.loginService.setUser(this.clientSelect, true);

    this.cardService.getListCustomFromServer();
    console.log(index);

  }
  OnClickSeeListClient() {
    this.evChangeMenu.emit('custom');
  }

}
