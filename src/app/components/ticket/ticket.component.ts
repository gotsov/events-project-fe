import {Component, Input, OnInit} from '@angular/core';
import {TicketFullInfo} from "../../models/TicketFullInfo";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() ticket : TicketFullInfo;

  qrCodeImage: string = '';
  showQrModal = false;

  constructor(private ticketService: TicketService) { }

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
    this.showQrModal = true;
  }

  hideQrCodeModal() {
    this.showQrModal = false;

  }
}
