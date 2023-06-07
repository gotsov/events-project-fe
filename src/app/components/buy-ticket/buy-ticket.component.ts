import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from "../../models/Event";

@Component({
  selector: 'buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  @Output() closeBuyTickets: EventEmitter<void> = new EventEmitter<void>();

  @Input() event: Event;
  constructor() { }

  ngOnInit(): void {
  }

}
