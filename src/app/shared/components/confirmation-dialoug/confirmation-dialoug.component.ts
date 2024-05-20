import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialoug',
  templateUrl: './confirmation-dialoug.component.html',
  styleUrls: ['./confirmation-dialoug.component.scss'],
})
export class ConfirmationDialougComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialougComponent>) {}

  /**
   * Close dialog
   * @param {boolean} isDeleteUser
   * @memberof ConfirmationDialougComponent
   */
  closeDialog(isDeleteUser: boolean) {
    this.dialogRef.close(isDeleteUser);
  }
}
