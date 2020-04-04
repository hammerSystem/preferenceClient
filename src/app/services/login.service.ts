import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // urlBd = 'https://preferenceclient.firebaseio.com';
  // user = { name: '' };
  // isLogin = false;
  // public userLogin$: Observable<{}>;

  // @Output() evLogin: EventEmitter<string> = new EventEmitter();

  user: SocialUser = new SocialUser();
  loggedIn = false;


  // constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  // isLogin = false;
  // user2 = {
  //   name: ''
  // };

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar) { }

  setUser(user, loggedIn) {
    this.user = user;
    this.loggedIn = loggedIn;
    // debugger;
    // this.evLogin.emit('logOk');
  }

  // authStateSubscribe() {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     console.log("user a l'init:");
  //     console.log(this.user);
  //   });
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }


  // checkOnServerIfExiste(userName) {
  // }

  // login(user) {
  //   if ( user.name === '') {
  //     this.isLogin = false;
  //     console.log('user est vide');
  //     this.messageIsAuth();
  //     return;
  //   }
  //   this.user = user;
  //   this.isLogin = true;
  //   console.log('est loguer');
  //   this.messageIsAuth();
  // }


  // getUrlAccountBdWithUser() {
  //   let urlBdSaveList = this.urlBd;
  //   urlBdSaveList += '/account/';
  //   urlBdSaveList += this.user.name;
  //   urlBdSaveList += '.json';
  //   debugger;
  //   return urlBdSaveList;
  // }


  messageIsAuth() {

    if (this.loggedIn) {
      this.openSnackBar('Identification', `Identification réussi en tant que ${this.user.name}`);
    } else {
      this.openSnackBar('Erreur d\'identification', 'Veuillez saisir un nom valide');
    }
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.panelClass = ['custom-snackbar'];

    this.snackBar.open(message, action, config);

  }

  // saveUserOnServer(user):boolean{
  // 	this.userLogin$ =this.getObservableSaveAccountOnServer(this.user);
  // 	this.userLogin$.subscribe(() =>
  // 	{
  // 		this.isLogin= true;
  // 		console.log('Enregistrement user server terminé !');
  // 	},
  // 	(error) => {
  // 		console.log('Erreur put user! : ' + error);
  // 		this.isLogin= false
  // 	}
  // );
  // return this.isLogin;
  // }

  // saveUserOnServer(user): boolean {
  //   debugger;
  //   if ( user.name === '') {
  //     this.loggedIn = false;
  //     console.log('user est vide');
  //     return;
  //   }
  //   this.user = user;
  //   const urlToSave = this.getUrlAccountBdWithUser();

  //   let requeteHttp: any;
  //   requeteHttp = this.httpClient.put(urlToSave, this.user);
  //   debugger;
  //   console.log('PUT user !!');

  //   requeteHttp.subscribe(
  //     () => {
  //       this.isLogin = true;
  //       console.log('Enregistrement user server terminé !');

  //     },
  //     (error) => {
  //       console.log('Erreur put user! : ' + error);
  //       this.isLogin = false;
  //     }
  //   );
  //   return this.isLogin;

  // }


  // getObservableSaveAccountOnServer(user): any {
  // 	// debugger;
  // 	if ( this.user.name == ''){
  // 		this.isLogin =false;
  // 		console.log('user est vide')
  // 		return;
  // 	}
  // 	this.user = user;
  // 	const urlToSave = this.getUrlAccountBdWithUser();

  // 	let requeteHttp:any;
  // 	requeteHttp = this.httpClient.put(urlToSave, this.user)
  // 	debugger;
  // 	console.log('PUT user !!');
  // 	return requeteHttp;

  // }

  // saveListCardToServer(cardType) {

  // 	// debugger;
  // 	let urlBdSaveList = this.getUrlBdWithUserAndType(cardType)
  // 	let goodList = this.getListFromType(cardType);
  // 	let requeteHttp:any;

  // 	requeteHttp = this.httpClient.put(urlBdSaveList, goodList)
  // 	console.log('PUT!!');

  // 	requeteHttp
  // 	.subscribe(
  // 		() => {
  // 		console.log('Enregistrement server terminé !');
  // 		},
  // 		(error) => {
  // 		console.log('Erreur ! : ' + error);
  // 		}
  // 	);
  // }


}

