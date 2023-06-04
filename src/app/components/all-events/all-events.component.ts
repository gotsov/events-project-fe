import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Router} from "@angular/router";

@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  events: Event[];

  showModal: boolean = false;

  isExtensionVisible : boolean = false;

  openExtension() {
    console.log("openExtension() in all-events")
    this.isExtensionVisible = true;
  }

  addEventWithExtension(eventData: any) {

  }

  constructor(private router: Router,
              private eventService: EventService) { }

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
    console.log("in showModalFunction")
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }

  onChildRefresh() {
    console.log("in refresh in parent")
    this.loadEvents();
    console.log("after loadEvents in refresh in parent")
  }

  redirectToEvent(eventId: number) {
    this.router.navigate(['/event', eventId]);
  }
}
