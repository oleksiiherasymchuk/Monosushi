import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call-modal',
  templateUrl: './call-modal.component.html',
  styleUrls: ['./call-modal.component.scss']
})
export class CallModalComponent {

  constructor(
    private dialogRef: MatDialogRef<CallModalComponent>
  ){}

  call(): void{
    this.dialogRef.close()
  }

}
