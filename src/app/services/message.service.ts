import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private snackBar: MatSnackBar) { }


  snackMessage(title, message) {
    this.openSnackBar(title, message);
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = ['custom-snackbar'];

    this.snackBar.open(message, action, config);

  }

}
