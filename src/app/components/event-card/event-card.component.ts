import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../models/Event";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event : Event;

  pricing: string = '';
  minPricing: number = 0;
  maxPricing: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.setPricing();
  }

  setPricing() {
    if (this.event.tickets.pop() == null) {
      this.pricing = 'Няма налични билети';
    } else if (this.event.tickets.pop().sector.name === 'free') {
      this.pricing = 'Безплатно събитие';
    } else {
      this.setMinMaxPricing();
    }
  }

  setMinMaxPricing() {
    if (this.event.tickets.pop() != null) {
      this.minPricing = this.event.tickets.pop().sector.price;
      for (let ticket of this.event.tickets) {

        if (ticket.sector.price < this.minPricing) {
          this.minPricing = ticket.sector.price;
        }

        if (ticket.sector.price > this.maxPricing) {
          this.maxPricing = ticket.sector.price;
        }
      }
    }

    this.pricing = this.minPricing + " лв. - " + this.maxPricing + " лв.";
  }

  isEventExpired(): boolean {
    const endDate = new Date(this.event.endDate);
    const currentDate = new Date();

    return endDate < currentDate;
  }
}
