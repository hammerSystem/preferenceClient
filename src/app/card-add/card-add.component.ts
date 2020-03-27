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
  handleFiles(event){
    console.log('clic ajout file appareil');
    this.file = event.target.files[0];
    this.uploadFile();

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
    console.log(this.url);
    this.cardService.addCardToList('custom', this.url, 'titre test', false, '', '')
  }


  OnClickHelp(){
    console.log('help');
    if (this.expandMore === false){
      this.expandMore = true;
    } else {
      this.expandMore = false;
    }
  }

  saveNewCard() {
    console.log('on save ajout');

    this.cardService.addCardToList('custom', this.path, this.title, false, '', '');

    this.clearNewCard();
  }

  clearNewCard(){
    this.title = '';
    this.path = '';
  }
  // uploadImg(path){
  //   debugger;
  //   this.cardService.uploadImage(this.pathImageFileToUpload);
  // }

}
