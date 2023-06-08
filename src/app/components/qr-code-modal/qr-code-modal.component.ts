import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.css']
})
export class QrCodeModalComponent implements OnInit {

  @Output() closeQrCodeModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() qrCodeImage: string;
  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.closeQrCodeModal.emit();
  }

}
