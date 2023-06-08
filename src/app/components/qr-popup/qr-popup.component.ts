import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'qr-popup',
  templateUrl: './qr-popup.component.html',
  styleUrls: ['./qr-popup.component.css']
})
export class QrPopupComponent implements OnInit {

  qrCodeImage: string;

  constructor(
    private dialogRef: MatDialogRef<QrPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.qrCodeImage = data.qrCodeImage;
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
