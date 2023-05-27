import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";

@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  events: Event[];

  showModal: boolean = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: events => {
        this.events = events;
      }
    });
  }

  showModalFunction() {
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }
}
