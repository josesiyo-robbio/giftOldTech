import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-message-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent
{
  //CLASS PROPERTIES (NA)



  //CONSTRUCTOR
  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MessageDialogComponent>
  )
  {
    if (!data)
    {
      console.error('No se pasaron datos al diálogo');
      this.data = { title: 'Error', message: 'No se proporcionaron datos.' };
    }
  }



  //GETTERS & SETTERS (NA)



  //METHODS
  public onConfirm()
  {
    if (this.data.onOk)
    {
      this.data.onOk();
    }
    this.dialogRef.close();
  }



//LIFECYCLE HOOKS (NA)

}
