import {Component, Input, OnInit} from '@angular/core';
import {TicketFullInfo} from "../../models/TicketFullInfo";
import {TicketService} from "../../services/ticket.service";
import {QrPopupComponent} from "../qr-popup/qr-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket : TicketFullInfo;

  qrCodeImage: string = '';

  constructor(private ticketService: TicketService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode() {
    console.log(this.ticket.id.toString());
    this.ticketService.generateTicketQRCode(this.ticket.id.toString()).subscribe({
      next: response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrCodeImage = reader.result as string;
        };
        reader.readAsDataURL(response);
      }
    })
  }

  showQRCodePopup() {
    const dialogRef = this.dialog.open(QrPopupComponent, {
      data: { qrCodeImage: this.qrCodeImage },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any actions after the popup is closed, if needed
    });
  }
}
