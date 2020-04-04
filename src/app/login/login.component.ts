import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { LoginService} from '../services/login.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card-service';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser = new SocialUser();
  loggedIn = false;
  @Output() evLogin: EventEmitter<string> = new EventEmitter();


  // isLogin = false;
  // user2 = {
  //   name: ''
  // };

  constructor(private authService: AuthService,
              private loginService: LoginService,
              private cardService: CardService) {}
              // private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.loginService.authStateSubscribe();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("user a l'init:");
      console.log(this.user);
      // debugger;
      if (this.user !== null && typeof this.user.name !== 'undefined') {
        this.loginService.setUser(this.user, this.loggedIn);
        this.evLogin.emit('logOk');
      }
      // if (typeof this.loginService.user.name !== 'undefined') {
      //   this.cardService.getObservableListCardsFromServer('custom');
      // }

    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  // onClickLogin() {
  //   this.loginService.login(this.user2);
  // }

  // onClicFaceBookIcon() {
  //   console.log('FB auth');
  // }

  // onLogin() {

  //   console.log('this.userName:');
  //   console.log(this.user);
  //   this.loginService.isLogin = this.loginService.saveUserOnServer(this.user);
  //   console.log('is login:');
  //   console.log(this.loginService.isLogin);
  //   this.loginService.messageIsAuth();
  // }
  //   if (this.loginService.isLogin) {
  //     this.openSnackBar('Identification', `Identification réussi en tant que ${this.user.name}`);
  //     this.cardService.setUser(this.user);
  //   } else {
  //     this.openSnackBar('Erreur d\'identification', 'Veuillez saisir un nom valide');
  //   }
  // }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 2000,
  //   });
  // }


}
