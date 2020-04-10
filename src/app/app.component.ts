import { Component, HostListener } from '@angular/core';
import { CardService } from '../app/services/card-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pref-client';

  constructor(private cardService: CardService) { }


  ngOnDestroy() {
    debugger;
    console.log('destroy finale');
    // this.save()
  }

  @HostListener('window:beforeunload', ['$event'])
  SaveOnUnload($event: any) {
      // if (this.hasUnsavedData()) {
      //     $event.returnValue =true;
      // }
      console.log('Save list card on server!!!');
      this.cardService.saveListCardToServer('custom');
  }

}
