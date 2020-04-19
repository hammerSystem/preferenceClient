import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../services/card-service';
import { __importDefault } from 'tslib';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  @Input() title: string;
  @Input() title2: string;
  @Input() path: string;
  @Input() pathImageFileToUpload: string;

  expandMore = false;
  // @Input() description:string;

  private basePath = '/images';
  file: File;
  url = '';

  constructor(private cardService: CardService,  private afStorage: AngularFireStorage ) { }


  ngOnInit() {
  }
  handleFiles(event) {
    debugger;
    this.file = event.target.files[0];
    // this.uploadFile();

  }


   // method to upload file at firebase storage
   async uploadFile() {
    if (this.file) {
      const filePath = `${this.basePath}/${this.file.name}`;    // path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    // upload task
      this.getUrl(snap);
    } else {alert('Please select an image'); }
  }

  // method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  // store the URL
    // console.log(this.url);
    debugger;
    const fileType = this.getTypeFile(this.url);
    this.cardService.addCardToList('custom', this.url, this.title2, false, '', '', fileType);
  }

  // getTypeFile(url){
  //   const urlLower = url.toLowerCase();
  //   const idxOf = urlLower.search('pdf');
  //   let type = 'img';
  //   if (idxOf >= 0) {
  //     type = 'pdf';
  //   }
  //   return type;
  // }

  getTypeFile(url) {
    const urlLower = url.toLowerCase();

    let type = 'autre';
    const imgType: string[] = [ '.png', '.jpg', '.jpeg', '.gif']
    let idxOf: number;
    for (const t of imgType) {
      idxOf = urlLower.search(t);
      if (idxOf >= 0) {
        type = 'img';
        break;
      }
    }
    return type;
  }


  OnClickHelp() {
    // console.log('help');
    if (this.expandMore === false) {
      this.expandMore = true;
    } else {
      this.expandMore = false;
    }
  }

  saveNewCard() {
    // console.log('on save ajout');
    let fileType = this.getTypeFile(this.path);
    debugger;
    this.cardService.addCardToList('custom', this.path, this.title, false, '', '', fileType);

    this.clearNewCard();
  }

  clearNewCard() {
    this.title = '';
    this.path = '';
  }

  saveNewCard2() {
    this.uploadFile();
  }

  clearNewCard2() {
    debugger;
    this.title2 = '';
    this.path = '';
    this.file = null;
  }
  // uploadImg(path){
  //   debugger;
  //   this.cardService.uploadImage(this.pathImageFileToUpload);
  // }

}
