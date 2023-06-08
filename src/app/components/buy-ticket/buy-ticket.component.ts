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
  totalPrice: number = 0;
  eventSectors: SectorWithAvailableTickets[] = [];
  ticketQuantities: number[];

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
    for (let selectionElement of this.selection) {
      console.log(selectionElement.sector.id + " " + selectionElement.quantity);
      this.ticketService.buy(this.event.id, selectionElement.sector.id, selectionElement.quantity).subscribe({
        next: response => {
          console.log(response);
        },
        complete: () => {
          this.selectedSector = null;
          this.loadEventSectors();
          console.log("COMPLETE")
        },
        error: err => {
          console.log(err);
        }
      });
    }

    this.closeBuyTickets.emit();
    console.log("AFTER FOR")
  }
}
