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

  private user: SocialUser = new SocialUser();
  private loggedIn = false;

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
    // this.authService.signOut(); // maybe test a faire -> si plusieurs authentification sur meme appareil
    this.authService.authState.subscribe(
      (user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.user !== null && typeof this.user.name !== 'undefined') {
        this.loginService.setUser(this.user, this.loggedIn);
        this.loginService.setLogFb(true);
        this.evLogin.emit('logOk');
      }
    },
    err => console.log('erreur init FB authentification!!:  ', err));

  }
  signInWithFB(): void {
    if (this.loginService.loggedAsAdmin) {
      this.onCheckLogOutAsAdmin();
    }
    try {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }catch (err) {
        alert(err.message);
      }
    console.log('auth FB termine');
  }

  onClickToggleToCustomList() {
    this.evLogin.emit('custom');
  }

  signOut(): void {
    // debugger;
    this.cardService.saveListCardToServer('custom');
    if (this.loginService.logFb) {
      this.authService.signOut();
      this.loginService.setLogFb(false);
    }
    this.loginService.setUser('', false);
    this.cardService.listCardCustomImg = [];
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
    this.messageService.snackMessageSansTitre('Vous êtes déconnecté en tant qu\'administrateur');
  }


  onClickValidatePass() {
    // console.log('validate pass');
    // console.log(this.passwordValue) ;
    if (this.passwordValue === 'patate') {
      if (this.loginService.loggedIn) {
        this.signOut();
      }
      const adminUser = {
        name: 'admin owner',
        firstName: 'admin',
        lastName : 'owner'
      };
      this.loginService.setUser(adminUser, true);
      this.passIsActive = false;
      this.evLogin.emit('logAsAdmin');
    } else {
      this.messageService.snackMessageSansTitre('Le mot de passe est incorrect!');
    }
  }

  onClicktestAuthAsChose() {
    this.signOut();
    const choseUser = {
      name: 'Chose Bine',
      firstName: 'chose',
      lastName : 'bine'
    };
    this.loginService.setUser(choseUser, true);

    this.evLogin.emit('logOk');
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



