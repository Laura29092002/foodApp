import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  imports: [MatDialogModule],
  templateUrl: './alert-box.html',
  styleUrl: './alert-box.scss',
})
export class AlertBox {
  constructor(public dialoRef: MatDialogRef<AlertBox>,
    @Inject(MAT_DIALOG_DATA) public data : {message: string}
  ){}

  onConfirm(){
    this.dialoRef.close();
  }
}
