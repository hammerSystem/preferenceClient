import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
// import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor(private httpClient: HttpClient,
              private afStorage: AngularFireStorage,
              // private snackBar: MatSnackBar,
              private loginService: LoginService,
              private messageService: MessageService) { }

  valid: boolean;
  urlBd = 'https://preferenceclient.firebaseio.com';
  // user = {name: ''};

  listCardOwner = [];
  // listCardBathtub = [];
  listCardCustomImg = [];
  listClient = [];

  @Output() evReloadCustomList: EventEmitter<string> = new EventEmitter();

  // listCardKitchenEmptyOnServer:boolean = false;
  // listCardBathtubEmptyOnServer:boolean =false;
  // listCardCustomImgEmptyOnServer:boolean =false;

  public listOwner$: Observable<any[]> = this.getObservableListCardsFromServer('owner');
  // public listBathTub$: Observable<[]> = this.getObservableListCardsFromServer('bathtub');
  public listCustom$: Observable<any[]> = this.getObservableListCardsFromServer('custom');
  public listAllClient$: Observable<any[]> = this.getObservableAllClientFromServer();

  getListClient() {
    return this.listClient;
  }

  // setUser(user) {
  //   this.user = user;
  // }

  uploadImage(pathFile) {

    this.afStorage.upload('https://preferenceclient.firebaseio.com/image', pathFile );
    // this.afStorage.upload('https://preferenceclient.firebaseio.com/image', event.target.files[0]);
  }

  // snackMessage(title, message) {
  //   this.openSnackBar(title, message);
  // }

  // openSnackBar(message: string, action: string) {
  //   const config = new MatSnackBarConfig();
  //   config.duration = 2000;
  //   config.panelClass = ['custom-snackbar'];

  //   this.snackBar.open(message, action, config);

  // }

  // setCardTest() {
  //   this.listCardOwner = [
  //     {
  //       path: './assets/photo/cuisine1.jpg',
  //       title: 'titre photo 1',
  //       desc: 'une petite description de la photo 1',
  //       like: true,
  //       comment: ''
  //     },
  //     {
  //       path: './assets/photo/cuisine2.jpg',
  //       title: 'titre photo 2',
  //       desc: 'une petite description de la photo 2',
  //       like: true,
  //       comment: ''
  //     },
  //     {
  //       path: './assets/photo/cuisine3.jpg',
  //       title: 'titre photo 3',
  //       desc: 'une petite description de la photo 3',
  //       like: false,
  //       comment: ''
  //     },

  //     {
  //       path: '//maisonetdemeure.com/wp-content/uploads/imported/galleries/md-shot-5_SUP_HH_AU09.jpg',
  //       title: 'la cuisine de Ricardo :)',
  //       desc: 'Nice cuisine!!',
  //       like: false,
  //       comment: ''
  //       }
  //   ];

  // }

  getUrlBdWithUserAndType(cardType) {
    let urlBdSaveList = this.urlBd;
    urlBdSaveList += '/';

    if (cardType === 'owner') {
      urlBdSaveList += 'admin';
      urlBdSaveList += '_';
      urlBdSaveList += 'owner';
    } else if (cardType === 'custom') {
      urlBdSaveList += this.loginService.user.firstName;
      urlBdSaveList += '_';
      urlBdSaveList += this.loginService.user.lastName;
    }

    urlBdSaveList += '/listCardCustom.json'; // on va chercher custom meme si owner_admin, c'est custom

    // if (cardType === 'owner') {
    //   urlBdSaveList += '/listCardOwner.json';
    // // } else if (cardType === 'bathtub') {
    // //   urlBdSaveList += '/listCardBathtub.json';
    // } else if (cardType === 'custom') {
    //   urlBdSaveList += '/listCardCustom.json';
    // }

    return urlBdSaveList;
  }

  saveListCardToServer(cardType) {

    // debugger;
    // const adminUser = {
    //   name: 'admin owner',
    //   firstName: 'admin',
    //   lastName : 'owner'
    // };
    // this.loginService.setUser(adminUser, true);

    const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
    const goodList = this.getListFromType(cardType);
    if (goodList == null || goodList.length === 0) {
      console.log('attention liste est vide')
      debugger;
      return;
    }

    let requeteHttp: any;

    requeteHttp = this.httpClient.put(urlBdSaveList, goodList);
    console.log('PUT!!');

    requeteHttp
      .subscribe(
        () => {
          console.log('Enregistrement server terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
      this.saveListClientToServer();
  }


  saveListClientToServer() {

    debugger;

    console.log('save list client server');
    // check si existe deja on sort
    let clientIsInList = false;
    for (let client of this.listClient){
        if (client.name === this.loginService.user.name) {
          clientIsInList = true;
          return;
        }
    }
    // check si aucun ou undefined on sort pas enregistrement
    if (this.loginService.user.name == null || this.loginService.user.name === 'Aucun') {
      return;
    }

    this.listClient.push(this.loginService.user);

    let urlBdSaveList = this.urlBd;
    urlBdSaveList += '/listClient.json';

    let requeteHttp: any;

    requeteHttp = this.httpClient.put(urlBdSaveList, this.listClient);
    console.log('PUT!!');

    requeteHttp
      .subscribe(
      () => {
        console.log('Enregistrement list client server terminé !');
      },
      (error) => {
        console.log('Erreur save list client ! : ' + error);
      }
      );
  }

  checkIfUrlExistOnBd(url) {
    console.log('check bd');
  }

  getObservableAllClientFromServer():any{
    // A REMETTRE
    // if (typeof this.loginService.user.name === 'undefined') {
    //   return;
    // }

    // debugger;
    const urlBdSaveList = 'https://preferenceclient.firebaseio.com/listClient.json';
    return this.httpClient.get<any[]>(urlBdSaveList);
  }

  getListClientFromServer(): any {

    // this.listCustom$: Observable<[]> = this.getObservableListCardsFromServer('custom');

    debugger;
    const urlBdSaveList = 'https://preferenceclient.firebaseio.com/listClient.json';
    this.listAllClient$ = this.httpClient.get<any[]>(urlBdSaveList);
    this.listAllClient$.subscribe((listClient: any[]) => {
      // let listNoNull = [];
      if (listClient) {
      //   for (let cli of listClient) {
      //     if (cli != null){
      //       listNoNull.push(cli);
      //     }
      //   }
        // this.listClient = listNoNull;
        this.listClient = listClient;
      } else {
        console.log('list client est vide...)');
        // this.listCardCustomImgEmptyOnServer = true;
      }
    });
  }

  getListCustomFromServer(): any {

    // this.listCustom$: Observable<[]> = this.getObservableListCardsFromServer('custom');

    // debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType('custom');
    this.listCustom$ = this.httpClient.get<any[]>(urlBdSaveList);
    this.listCustom$.subscribe((listCard: any[]) => {
      if (listCard) {
        this.setListFromType('custom', listCard);
      } else {
        console.log('list custom vide...)');
        this.setListFromType('custom', []);
        // this.listCardCustomImgEmptyOnServer = true;
      }
    });
  }

  getListOwnerFromServer(): any {

    // this.listCustom$: Observable<[]> = this.getObservableListCardsFromServer('custom');

    // debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType('owner');
    this.listOwner$ = this.httpClient.get<any[]>(urlBdSaveList);
    this.listOwner$.subscribe((listCard: any[]) => {
      if (listCard) {
        this.setListFromType('owner', listCard);
      } else {
        console.log('list Owner vide...)');
        // this.listCardCustomImgEmptyOnServer = true;
      }
    });
  }


  getObservableListCardsFromServer(cardType): any {

    if (typeof this.loginService.user.name === 'undefined') {
      return;
    }
    // debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
    return this.httpClient.get<any[]>(urlBdSaveList);
  }


  // getListCardsFromServerOld(cardType): any {
  //   // debugger;
  //   const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
  //   return this.httpClient
  //     .get<any[]>(urlBdSaveList)
  //     .subscribe(
  //     (response) => {
  //       console.log('reponse');
  //       console.log(Object.values(response));
  //       this.setListFromType(cardType, Object.values(response)[0]);
  //     },
  //     (error) => {
  //       console.log('Erreur dans le getList server ! : ' + error);
  //     }
  //     );
  // }

  // getAllListCardFromServer() {

  //   console.log('get all from server');

  //   this.listOwner$.subscribe((listCard: any[]) => {
  //     if (listCard) {
  //       this.setListFromType('owner', listCard);
  //     } else {
  //       console.log('list owner vide...)');
  //       // this.listCardKitchenEmptyOnServer = true;
  //     }
  //   });

  //   this.listCustom$.subscribe((listCard: any[]) => {
  //     if (listCard) {
  //       this.setListFromType('custom', listCard);
  //     } else {
  //       console.log('list custom vide...)');
  //     }
  //   });
  // }

//   test(typeList) {
//   if (typeList === 'custom' && this.listCardCustomImg.length === 0 && this.loginService.user.name !== 'undefinine') {
//     const monObservable = this.getObservableListCardsFromServer('custom');
//     console.log('ici');

//     monObservable.subscribe((listCard: any[]) => {
//       if (listCard) {
//         this.setListFromType('custom', listCard);
//         // this.evReloadCustomList.emit('reloadCustomList');
//       } else {
//         console.log('list custom vide...)');

//         // this.listCardCustomImgEmptyOnServer = true;
//       }
//     });
//   }
// }

  getListFromType(typeList: string) {
    // debugger;
    if (typeList === 'owner') {
        return this.listCardOwner;
    // } else if (typeList === 'bathtub') {
    //   return this.listCardBathtub;
      } else if (typeList === 'custom') {
        return this.listCardCustomImg;
      }
  }

  setListFromType(typeList: string, listCards: any[]) {
    // debugger;
    if (typeList === 'owner') {
            this.listCardOwner = listCards;
    // } else if (typeList === 'bathtub') {
    //   this.listCardBathtub = listCards;
    } else if (typeList === 'custom') {
      this.listCardCustomImg = listCards;
    }
  }

  addCardToList(typeList: string, pathImg: string, title: string, like: boolean, comment: string,  description: string) {
    // this.checkImage(pathImg, this.success, this.fail);
    // this.checkImage(pathImg, this.success, this.fail);
    // if (!this.valid){
    // 	console.log('valid??');
    // 	console.log(this.valid);
    // 	return
    // }

    let goodList: any[];
    goodList = this.getListFromType(typeList);
    goodList.push(
      {
        path: pathImg,
        title,
        desc: description,
        like,
        comment
      }
    );
    this.messageService.snackMessageSansTitre('Une photo a été ajoutée votre liste');
  }

  saveACard(cardType, cardIndex, like, comment) {
    console.log('save card ', cardIndex, cardType);
    const goodList = this.getListFromType(cardType);
    goodList[cardIndex].like = like;
    goodList[cardIndex].comment = comment;
  }

  deleteACard(cardType, index, message) {
    // debugger;
    const goodList = this.getListFromType(cardType);
    goodList.splice(index, 1);
    if (message) {
      this.messageService.snackMessageSansTitre('Une photo a été supprimée de votre liste');
    }

  }



  // success(){
  // 	console.log('success')
  // 	this.valid = true;
  // }
  // fail(){
  // 	console.log('fail')
  // 	this.valid= false;
  // }

  // monCallBack(url, message){
  // 	debugger;
  // 	console.log(message);
  // }


   // Check the existence of an image file at `url` by creating a
  // temporary Image element. The `success` callback is called
  // if the image loads correctly or the image is already complete.
  // The `failure` callback is called if the image fails to load
  // or has failed to load in the past.
//   	checkImage(url, success, failure):boolean {
// 		debugger;
// 		let errors = {};
// 		var img = new Image(),    // the
// 		loaded = false,
// 		errored = false;

//     // Run only once, when `loaded` is false. If `success` is a
//     // function, it is called with `img` as the context.
// 		img.onload = function () {
// 			if (loaded) {
// 				return;
// 			}

// 			loaded = true;

// 			if (success && success.call) {
// 				success.call(img);
// 				// return true;
// 			}
// 		};

//     // Run only once, when `errored` is false. If `failure` is a
//     // function, it is called with `img` as the context.
//     img.onerror = function () {
//       if (errored) {
//         return;
//       }

//       errors[url] = errored = true;

//       if (failure && failure.call) {
// 		// failure.call(img);
// 		return false;
//       }
//     };

//     // If `url` is in the `errors` object, trigger the `onerror`
//     // callback.
//     if (errors[url]) {
//       img.onerror.call(img);
//       return;
//     }

//     // Set the img src to trigger loading
//     img.src = url;

//     // If the image is already complete (i.e. cached), trigger the
//     // `onload` callback.
//     if (img.complete) {
//       img.onload.call(img);
//     }
//   };

}
