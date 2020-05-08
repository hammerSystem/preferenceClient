import { Component, HostListener } from '@angular/core';
import { CardService } from '../app/services/card-service';
import { LoginService } from '../app/services/login.service';
// import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pref-client';

  constructor(private cardService: CardService,
    // private authService: AuthService,
    private loginService: LoginService) { }


  ngOnDestroy() {

    // console.log('destroy finale');
    // this.save()
  }

  // @HostListener('window:pagehide', ['$event'])  // for safarie
  // SaveOnUnloadSafrie($event: any) {
  //   console.log('JM SAFARIE onbeforeunload');
  //   // $event.returnValue = '';
  //   if (this.loginService.loggedIn) {

  //     if (this.loginService.logFb) {
  //     //  this.authService.signOut();
  //      console.log('JM SAFARIE - sign out FB');
  //     }
  //     this.loginService.setUser('', false);
  //  }
  // }


  // @HostListener('window:beforeunload', ['$event']) // doesn't support on safarie make
  // SaveOnUnload($event: any) {
  //   console.log('JM onbeforeunload');
  //   // $event.returnValue = '';
  //   if (this.loginService.loggedIn) {

  //     if (this.loginService.logFb) {
  //     //  this.authService.signOut();
  //      console.log('JM -sign out FB');
  //     }
  //     this.loginService.setUser('', false);
  //  }

//  }

}
