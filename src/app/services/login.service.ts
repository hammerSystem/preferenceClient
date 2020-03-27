import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBd = 'https://preferenceclient.firebaseio.com';
  user = { name: '' };
  isLogin = false;

  // public userLogin$: Observable<{}>;

    constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  checkOnServerIfExiste(userName) {
  }

  login(user) {
    if ( user.name === '') {
      this.isLogin = false;
      console.log('user est vide');
      this.messageIsAuth();
      return;
    }
    this.user = user;
    this.isLogin = true;
    console.log('est loguer');
    this.messageIsAuth();
  }


  getUrlAccountBdWithUser() {
    let urlBdSaveList = this.urlBd;
    urlBdSaveList += '/account/';
    urlBdSaveList += this.user.name;
    urlBdSaveList += '.json';
    debugger;
    return urlBdSaveList;
  }


  messageIsAuth() {

    if (this.isLogin) {
      this.openSnackBar('Identification', `Identification réussi en tant que ${this.user.name}`);
    } else {
      this.openSnackBar('Erreur d\'identification', 'Veuillez saisir un nom valide');
    }
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.panelClass = ['custom-snackbar'];

    this._snackBar.open(message, action, config);

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

  saveUserOnServer(user): boolean {
    debugger;
    if ( user.name === '') {
      this.isLogin = false;
      console.log('user est vide');
      return;
    }
    this.user = user;
    const urlToSave = this.getUrlAccountBdWithUser();

    let requeteHttp: any;
    requeteHttp = this.httpClient.put(urlToSave, this.user);
    debugger;
    console.log('PUT user !!');

    requeteHttp.subscribe(
      () => {
        this.isLogin = true;
        console.log('Enregistrement user server terminé !');

      },
      (error) => {
        console.log('Erreur put user! : ' + error);
        this.isLogin = false;
      }
    );
    return this.isLogin;

  }


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

