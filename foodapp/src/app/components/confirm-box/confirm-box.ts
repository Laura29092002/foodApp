import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  imports: [MatDialogModule],
  templateUrl: './confirm-box.html',
  styleUrl: './confirm-box.scss',
})
export class ConfirmBox {

  constructor(public dialogRef: MatDialogRef<ConfirmBox>,
    @Inject(MAT_DIALOG_DATA) public data : {message: string}
  ){}

  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

}
