import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { LoginService} from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card-service';
import { MessageService } from '../services/message.service';
// import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FacebookService, InitParams, LoginResponse, LoginOptions  } from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // private user: SocialUser = new SocialUser();
  private loggedIn = false;
  private user;

  @Output() evLogin: EventEmitter<string> = new EventEmitter();

  configApp = false;
  passIsActive = false;
  // logAsAdmin = false;
  @Input() passwordValue: string;

  constructor(
    // private authService: AuthService,
    private fb: FacebookService,
    public loginService: LoginService,
    private cardService: CardService,
    private messageService: MessageService) {
    // let initParams: InitParams = {
    //   appId: '1034585276923099', // test
    //   // appId: '224516148907971', // prod
    //   xfbml: true,
    //   version: 'v2.0'
    // };
    fb.init({
      // appId: '1034585276923099', // test
      appId: '224516148907971', // prod
      xfbml: true,
      version: 'v2.0'
    })
  }

  share = 'https://adncuisines.ca/';


  loginWithFacebook(): void {

    this.fb.login()
      .then((response: LoginResponse) => {
        console.log('Logged in', response)
        this.getFbProfile();
        // let user = this.getUserFromRawFbUser(userFbRaw);
        // this.loginService.setUser(user, true);
      }

        )
      .catch((error: any) => console.error(error));
  }

  // loginWithFacebook() {

  //   const loginOptions: LoginOptions = {
  //     enable_profile_selector: true,
  //     return_scopes: true,
  //     scope: 'public_profile,user_friends,email,pages_show_list'
  //   };

  //   this.fb.login(loginOptions)
  //     .then((res: LoginResponse) => {
  //       console.log('Logged in', res);
  //     })
  //     .catch(this.handleError);

  // }

  getFbProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
        // return res;
        this.user = this.getUserFromRawFbUser(res);
        this.loginService.setUser(this.user, true);
        this.loggedIn = true;
        this.loginService.setLogFb(true);
        this.evLogin.emit('logOk');

      })
      .catch(this.handleError);
  }

getUserFromRawFbUser(rawFbUser){
  let idxSpace: number;
  debugger;
  idxSpace = rawFbUser.name.indexOf(' ');
  let firstName = rawFbUser.name.substr(0, idxSpace);
  let lastName = rawFbUser.name.substr(idxSpace+1);
  let user = {
      name: rawFbUser.name,
      firstName: firstName,
      lastName: lastName,
      id: rawFbUser.id
    }
    return user;
  }


  private handleError(error) {
    console.error('Error processing action', error);
  }

  shareOnFacebook() {
    let url = 'http://www.facebook.com/sharer.php?u='+ this.share
        let newwindow=window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
    if (window.focus) {
      newwindow.focus()
    }
  }

  /* make the API call */
  // this.fb.api(
  //   "/{user-id}/",
  //   function (response) {
  //     if (response && !response.error) {
  //       /* handle the result */
  //       console.log(reponse);
  //     }
  //   }
  // );

  ngOnInit() {}
  //   // this.authService.signOut(); // maybe test a faire -> si plusieurs authentification sur meme appareil
  //   this.authService.authState.subscribe(
  //     (user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     if (this.user !== null && typeof this.user.name !== 'undefined') {
  //       this.loginService.setUser(this.user, this.loggedIn);
  //       this.loginService.setLogFb(true);
  //       this.evLogin.emit('logOk');
  //     }
  //   },
  //   err => console.log('erreur init FB authentification!!:  ', err));

  // }
  // signInWithFB(): void {
  //   if (this.loginService.loggedAsAdmin) {
  //     this.onCheckLogOutAsAdmin();
  //   }
  //   try {
  //     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   }catch (err) {
  //       alert(err.message);
  //     }
  //   console.log('auth FB termine');
  // }

  onClickToggleToCustomList() {
    this.evLogin.emit('custom');
  }

  signOut(): void {
    // debugger;
    this.cardService.saveListCardToServer('custom');
    if (this.loginService.logFb) {
      // this.authService.signOut();
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



