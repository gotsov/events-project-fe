import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../models/Ticket";
import {TicketService} from "../../services/ticket.service";
import {TicketFullInfo} from "../../models/TicketFullInfo";

@Component({
  selector: 'my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  myTickets: TicketFullInfo[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getCurrentUserTickets().subscribe({
      next: response => {
        this.myTickets = response;
      }
    })
  }

}
