import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from "../../models/Event";
import {Sector} from "../../models/Sector";
import {Ticket} from "../../models/Ticket";
import {EventService} from "../../services/event.service";
import {SectorWithAvailableTickets} from "../../models/SectorWithAvailableTickets";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  @Output() closeBuyTickets: EventEmitter<void> = new EventEmitter<void>();

  @Input() event: Event;

  selectedSector: SectorWithAvailableTickets;
  numberOfTickets: number = 0;
  eventSectors: SectorWithAvailableTickets[] = [];
  ticketQuantities: number[];
  showPopup: boolean = false;
  showSuccess: boolean = false;
  successText: string = '';
  disableNumberSelection: boolean = true;

  selection: any[] = [];

  constructor(private eventService: EventService,
              private ticketService: TicketService) { }

  ngOnInit() {
    this.loadEventSectors();
    this.populateTicketQuantities();
  }

  populateTicketQuantities() {
    console.log("populateTicketQuantities:" + this.selectedSector?.numberOfAvailableTickets);
    const maxQuantity = Math.min(this.selectedSector?.numberOfAvailableTickets || 0, 10);
    this.ticketQuantities = Array.from({ length: maxQuantity }, (_, index) => index + 1);
  }

  calculateMaxNumberOfTickets() {
    if (this.selectedSector) {
      const maxTickets = Math.min(this.selectedSector.numberOfAvailableTickets, 10);
      if (this.numberOfTickets > maxTickets) {
        this.numberOfTickets = maxTickets;
      }
    } else {
      this.numberOfTickets = 0;
    }
  }

  onSectorChange(sector: SectorWithAvailableTickets) {
    this.disableNumberSelection = false;
    this.selectedSector = sector;
    this.populateTicketQuantities();
    this.calculateMaxNumberOfTickets();
  }

  loadEventSectors() {
    this.eventService.getEventSectors(this.event.id).subscribe({
      next: response => {
        this.eventSectors = response;
      },
      complete: () => {
        this.removeSoldOutSectors();
        this.populateTicketQuantities();
        this.calculateMaxNumberOfTickets();
        console.log(this.eventSectors);
      }
    })
  }

  removeSoldOutSectors() {
    let sectorsToRemove: SectorWithAvailableTickets[] = [];
    for (let eventSector of this.eventSectors) {
      if (eventSector.numberOfAvailableTickets === 0) {
        sectorsToRemove.push(eventSector);
      }
    }

    this.eventSectors = this.eventSectors.filter(obj => !sectorsToRemove.includes(obj));
  }

  selectTickets() {
    this.disableNumberSelection = true;
    const selectedTicket = {
      sector: this.selectedSector,
      quantity: this.numberOfTickets,
      price: this.selectedSector.price * this.numberOfTickets
    };

    this.selection.push(selectedTicket);

    this.selectedSector = null;
    this.numberOfTickets = null;
  }

  removeTicket(index: number) {
    this.selection.splice(index, 1);
  }

  buyTickets() {
    this.showPopup = true;
  }

  cancelPurchase() {
    this.showPopup = false;
  }

  closeSuccess() {
    this.showSuccess = false;
  }

  confirmPurchase() {
    for (let selectionElement of this.selection) {
      this.ticketService.buy(this.event.id, selectionElement.sector.id, selectionElement.quantity).subscribe({
        next: response => {
          console.log(response);
        },
        complete: () => {
          this.successText = 'Успешно закупихте билети';
          this.showSuccess = true;
          this.selectedSector = null;
          this.loadEventSectors();
          console.log('this.showSuccess' + this.showSuccess)
        },
        error: err => {
          this.successText = 'Грешка при закупуването на билети! Опитайте отново.';
          this.showSuccess = true;
          console.log(err);
        }
      });
    }

    this.showPopup = false;
    this.selection = [];
    this.disableNumberSelection = true;
    //this.closeBuyTickets.emit();
  }

}
