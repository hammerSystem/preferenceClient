import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { LoginService} from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card-service';
import { MessageService } from '../services/message.service';
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

  configApp = false;
  passIsActive = false;
  // logAsAdmin = false;
  @Input() passwordValue: string;

  constructor(private authService: AuthService,
              public loginService: LoginService,
              private cardService: CardService,
              private messageService: MessageService) { }

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
    if (this.loginService.loggedAsAdmin){
      this.onCheckLogOutAsAdmin();
    }
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.loginService.setUser('', false);
  }

  onCheckManageApp() {
    if (this.passIsActive) {
      this.passIsActive = false;
    } else {
      this.passIsActive = true;
    }
    console.log('activate password');
  }

  onCheckLogOutAsAdmin() {
    this.passIsActive = false;
    this.loginService.loggedAsAdmin = false;
    this.loginService.setUser('', false);
    this.messageService.snackMessage('Authentification', 'Vous n\'êtes plus connecter en tant qu\'administrateur');
  }


  onClickValidatePass() {
    console.log('validate pass');
    console.log(this.passwordValue) ;
    if (this.passwordValue === 'patate') {
      console.log('ok pass bon');
      const adminUser = {
        name: 'admin owner',
        firstName: 'admin',
        lastName : 'owner'
      };
      this.loginService.setUser(adminUser, true);
      this.evLogin.emit('logAsAdmin');
    } else {
      this.messageService.snackMessage('Authentification', 'Le mot de passe est incorrect!');
    }
  }


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



