import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor(private httpClient: HttpClient, private afStorage: AngularFireStorage) { }

  valid: boolean;
  urlBd = 'https://preferenceclient.firebaseio.com';
  user = {name: ''};

  listCardOwner = [];
  // listCardBathtub = [];
  listCardCustomImg = [];

  // listCardKitchenEmptyOnServer:boolean = false;
  // listCardBathtubEmptyOnServer:boolean =false;
  // listCardCustomImgEmptyOnServer:boolean =false;

  public listOwner$: Observable<[]> = this.getObservableListCardsFromServer('owner');
  // public listBathTub$: Observable<[]> = this.getObservableListCardsFromServer('bathtub');
  public listCustom$: Observable<[]> = this.getObservableListCardsFromServer('custom');

  setUser(user) {
    this.user = user;
  }

  uploadImage(pathFile) {

    this.afStorage.upload('https://preferenceclient.firebaseio.com/image', pathFile );
    // this.afStorage.upload('https://preferenceclient.firebaseio.com/image', event.target.files[0]);
  }


  setCardTest() {
    this.listCardOwner = [
      {
        path: './assets/photo/cuisine1.jpg',
        title: 'titre photo 1',
        desc: 'une petite description de la photo 1',
        like: true,
        comment: ''
      },
      {
        path: './assets/photo/cuisine2.jpg',
        title: 'titre photo 2',
        desc: 'une petite description de la photo 2',
        like: true,
        comment: ''
      },
      {
        path: './assets/photo/cuisine3.jpg',
        title: 'titre photo 3',
        desc: 'une petite description de la photo 3',
        like: false,
        comment: ''
      },

      {
        path: '//maisonetdemeure.com/wp-content/uploads/imported/galleries/md-shot-5_SUP_HH_AU09.jpg',
        title: 'la cuisine de Ricardo :)',
        desc: 'Nice cuisine!!',
        like: false,
        comment: ''
        }
    ];

    // this.listCardBathtub = [
    //   {
    //     path: './assets/photo/salle_bain1.jpg',
    //     title: 'titre photo 1',
    //     desc: 'une petite description de la photo 1',
    //     like: false,
    //     comment: ''
    //   },
    //   {
    //     path: './assets/photo/salle_bain2.jpg',
    //     title: 'titre photo 2',
    //     desc: 'une petite description de la photo 2',
    //     like: false,
    //     comment: ''
    //   },
    //   {
    //     path: './assets/photo/salle_bain3.jpg',
    //     title: 'titre photo 3',
    //     desc: 'une petite description de la photo 3',
    //     like: false,
    //     comment: ''
    //   }
    //   ];
  }

  getUrlBdWithUserAndType(cardType) {
    let urlBdSaveList = this.urlBd;
    urlBdSaveList += '/';
    urlBdSaveList += this.user.name;

    if (cardType === 'owner') {
      urlBdSaveList += '/listCardOwner.json';
    // } else if (cardType === 'bathtub') {
    //   urlBdSaveList += '/listCardBathtub.json';
    } else if (cardType === 'custom') {
      urlBdSaveList += '/listCardCustom.json';
    }

    return urlBdSaveList;
  }

  // getIsListEmptyOnServer(cardType){

  // 	// debugger;
  // 	if (cardType === 'kitchen'){
  // 		return this.listCardKitchenEmptyOnServer;
  // 	}
  // 	else if(cardType === 'bathtub'){
  // 		return this.listCardBathtubEmptyOnServer;
  // 	}
  // 	else if(cardType === 'custom'){
  // 		return this.listCardCustomImgEmptyOnServer
  // 	}
  // }
  // setIsEmpty(cardType, value){
  // 	if (cardType === 'kitchen'){
  // 		this.listCardKitchenEmptyOnServer = value;
  // 	}
  // 	else if(cardType === 'bathtub'){
  // 		this.listCardBathtubEmptyOnServer = value;
  // 	}
  // 	else if(cardType === 'custom'){
  // 		this.listCardCustomImgEmptyOnServer = value;
  // 	}
  // }

  saveListCardToServer(cardType) {

    debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
    const goodList = this.getListFromType(cardType);
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
  }

  checkIfUrlExistOnBd(url) {
    console.log('check bd');

  }


  getObservableListCardsFromServer(cardType): any {
    // debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
    return this.httpClient.get<any[]>(urlBdSaveList);
  }


  getListCardsFromServerOld(cardType): any {
    // debugger;
    const urlBdSaveList = this.getUrlBdWithUserAndType(cardType);
    return this.httpClient
      .get<any[]>(urlBdSaveList)
      .subscribe(
      (response) => {
        console.log('reponse');
        console.log(Object.values(response));
        this.setListFromType(cardType, Object.values(response)[0]);
      },
      (error) => {
        console.log('Erreur dans le getList server ! : ' + error);
      }
      );
  }
  getAllListCardFromServer() {
    // this.listBathTub$= this.getListCardsFromServer('bathtub');
    // this.listCustom$ = this.getListCardsFromServer('custom');

    console.log('get all from server');
    // debugger;

    this.listOwner$.subscribe((listCard: any[]) => {
      if (listCard) {
        this.setListFromType('owner', listCard);
      } else {
        console.log('list owner vide...)');
        // this.listCardKitchenEmptyOnServer = true;
      }
    });

    // this.listBathTub$.subscribe((listCard: any[]) => {
    //   if (listCard) {
    //     this.setListFromType('bathtub', listCard);
    //   } else {
    //     console.log('list bath vide...)');
    //     // this.listCardBathtubEmptyOnServer = true;
    //   }
    // });

    this.listCustom$.subscribe((listCard: any[]) => {
      if (listCard) {
        this.setListFromType('custom', listCard);
      } else {
        console.log('list custom vide...)');
        // this.listCardCustomImgEmptyOnServer = true;
      }
    });

  }

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

  addCardToList(typeList: string, pathImg: string, title: string, description: string) {
    // this.checkImage(pathImg, this.success, this.fail);
    // this.checkImage(pathImg, this.success, this.fail);
    // if (!this.valid){
    // 	console.log('valid??');
    // 	console.log(this.valid);
    // 	return
    // }

    let goodList: any[];
    goodList = this.getListFromType(typeList);
    debugger;
    goodList.push(
      {
        path: pathImg,
        title,
        desc: description,
        like: false,
        comment: ''
      }
    );
  }

  saveACard(cardType, cardIndex, like, comment) {
    console.log('save card ', cardIndex, cardType);
    const goodList = this.getListFromType(cardType);
    goodList[cardIndex].like = like;
    goodList[cardIndex].comment = comment;
  }

  deleteACard(cardType, index) {
    const goodList = this.getListFromType(cardType);
    goodList.splice(index, 1);
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
