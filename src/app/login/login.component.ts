import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { LoginService} from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardService } from '../services/card-service';
import { MessageService } from '../services/message.service';
// import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
// import { FacebookService, InitParams, LoginResponse, LoginOptions  } from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // private user: SocialUser = new SocialUser();
  private loggedIn = false;
  private user;
  test
  appId: '1034585276923099' // test
  // appId: '224516148907971', // prod

  @Output() evLogin: EventEmitter<string> = new EventEmitter();

  configApp = false;
  passIsActive = false;
  // logAsAdmin = false;
  @Input() passwordValue: string;

  constructor(
    // private authService: AuthService,
    // private fb: FacebookService,
    public loginService: LoginService,
    private cardService: CardService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef) {

      // this.loadSDKFacebook(); //MSP metgode
    }


    // let initParams: InitParams = {
    //   appId: '1034585276923099', // test
    //   // appId: '224516148907971', // prod
    //   xfbml: true,
    //   version: 'v2.0'
    // };

  //   fb.init({
  //     // appId: '1034585276923099', // test
  //     appId: '224516148907971', // prod
  //     xfbml: true,
  //     version: 'v2.0'
  //   })
  // }

  share = 'https://adncuisines.ca/';


  loginWithFacebook(): void {
    // debugger;
    (window as any).FB.getLoginStatus((fbResponse) => {
      this.handleFbGetStatus(fbResponse);
    })
  }

  //     debugger;
  //     alert(`votre statut FB est : ${fbResponse.status}`);
  //     console.log('reponse apres le check statut : ')
  //     console.log(fbResponse)
  //     this.subscribeEvents();

  //     if (fbResponse.status === 'connected') {
  //       // const accessToken = fbResponse.authResponse.accessToken;
  //       // this.loginFacebook(accessToken);

  //     } else if (fbResponse.status === 'unknown') {
  //       (window as any).FB.login(function(response) {
  //         console.log('on est unkown on se connect!');
  //         console.log('reponse: ');
  //         console.log(response);
  //         debugger;

  //         // handle the response
  //       });
  //     }
  //  });
  // }



  //   this.fb.login()
  //     .then((response: LoginResponse) => {
  //       console.log('Logged in', response)
  //       this.getFbProfile();
  //       // let user = this.getUserFromRawFbUser(userFbRaw);
  //       // this.loginService.setUser(user, true);
  //     }

  //       )
  //     .catch((error: any) => console.error(error));
  // }

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
    // this.test = (window as any).FB.api('/me');
    // (window as any).FB.api('/me', {fields: 'last_name'}, function(response) {

    // (window as any).FB.api('/me', function(response) {
    (window as any).FB.api('/me', (response) => {
      this.handleFbGetUser(response);
  })
}

  handleFbGetUser(fbUserRes) {
    // debugger;
    if (fbUserRes !== 'null' && fbUserRes !== 'undefined'){
      alert(`FB GetUserINFO: ${fbUserRes.name}`);
    }
    else {
      alert('FB GetUserINFO: la reponse est vide !!');
    }
    console.log('la repons eest:');
    console.log(fbUserRes);
    this.user = this.getUserFromRawFbUser(fbUserRes);
    this.loginService.setUser(this.user, true);
    this.loggedIn = true;
    this.cdRef.detectChanges();
    this.loginService.setLogFb(true);
    this.evLogin.emit('logOk');

  }

  handleFbGetStatus(fbStatusResponse) {
    alert(`En partant votre statut FB est : ${fbStatusResponse.status}`);

    if (fbStatusResponse.status === 'connected') {
      this.getFbProfile();

    } else {
    // } else if (fbStatusResponse.status === 'unknown') {

      (window as any).FB.login((response) => {
        this.handleFbLogin(response);
        // handle the response
      });
    }
  }

  handleFbLogin(fbLoginResponse) {
    alert(`apres LOGIN FB votre statut FB est : ${fbLoginResponse.status}`);

    console.log(fbLoginResponse)
    this.getFbProfile();

  }


getUserFromRawFbUser(rawFbUser){
  let idxSpace: number;
  idxSpace = rawFbUser.name.indexOf(' ');
  let firstName = rawFbUser.name.substr(0, idxSpace);
  let lastName = rawFbUser.name.substr(idxSpace + 1);
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
  //   debugger;
  //   (window as any).fbAsyncInit = function() {
  //     (window as any).FB.init({
  //     appId: '1034585276923099', // test
  //     // appId: '224516148907971', // prod
  //     autoLogAppEvents : true,
  //     xfbml            : true,
  //     version          : 'v7.0'
  //   });
  // };


  private loadSDKFacebook() {

    // if (document.getElementById('facebook-jssdk')) {
    //   return;
    // }

    const urlSDK =
      'https://connect.facebook.net/fr_CA/sdk.js#xfbml=1&version=v2.9';

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = 'facebook-jssdk';
    js.src = `${urlSDK}&appId=${this.appId}`;
    js.onload = () => {
      this.subscribeEvents();
      // console.log('load');
    };
    fjs.parentNode.insertBefore(js, fjs);
  }

  private subscribeEvents() {
    (window as any).FB.Event.subscribe('auth.statusChange', rep => {
      this.statusChangeCallback(rep);
    });
  }


  statusChangeCallback(fbResponse) {
    alert(`votre statut FB est : ${fbResponse.status}`);

    if (fbResponse.status === 'connected') {
      this.getFbProfile();

    } else if (fbResponse.status === 'unknown') {
      (window as any).FB.login(function(response){
        console.log('reponse: ');
        console.log(response);

        // handle the response
      });

    }

  }

  private loginFacebook(token) {
    console.log('im log');
    // this.authService.loginWithToken(token, 'facebook').subscribe(() => {
    //   this.appRef.tick();
    //   this.login.emit(true);
    // });
  }

//   (function(d, s, id){
//     debugger;
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));

// // async defer src="https://connect.facebook.net/en_US/sdk.js">

// (window as any).FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//   });
//   }


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



