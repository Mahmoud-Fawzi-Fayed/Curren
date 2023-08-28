import { Component, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-fav-curr',
  templateUrl: './fav-curr.component.html',
  styleUrls: ['./fav-curr.component.scss']
})
export class FavCurrComponent {
 @Output() close$ = new EventEmitter<boolean>()

  constructor(private dialogRef : MatDialog){}
  onDialog() : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '3rem', right: '3rem' };
    dialogConfig.width= '400px'
    dialogConfig.height= '600px'
    const dialogRef = this.dialogRef.open(PopupComponent, dialogConfig);
  }
}
