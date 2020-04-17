import { Component, HostListener } from '@angular/core';
import { CardService } from '../app/services/card-service';
import { LoginService } from '../app/services/login.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pref-client';

  constructor(private cardService: CardService, private authService: AuthService, private loginService: LoginService) { }


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
      // debugger;
      if (this.loginService.loggedIn) {
        console.log('Save list card on server!!!');
        this.cardService.saveListCardToServer('custom');
        this.authService.signOut();
      }
      // debugger;
  }

}
