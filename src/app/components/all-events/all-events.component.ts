import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  events: Event[];

  showModal: boolean = false;
  isAdminOrOrganizer: boolean = false;
  isExtensionVisible : boolean = false;

  openExtension() {
    console.log("openExtension() in all-events")
    this.isExtensionVisible = true;
  }

  constructor(private router: Router,
              private eventService: EventService,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log("ngOnInit all-events")
    this.loadEvents();
    console.log("after this.loadEvents()")
    this.getUserRole();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: events => {
        console.log(events)
        this.events = events;
      },
      error: err => {
        console.log("error: " + err);
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

  getUserRole() {
    this.authService.getUserRole().subscribe({
      next: response => {
        this.isAdminOrOrganizer = response === 'ADMIN' || response === 'ORGANIZER';
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
