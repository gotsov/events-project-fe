import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {response} from "express";

@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  events: Event[];
  filteredEvents: Event[];

  showModal: boolean = false;
  isAdminOrOrganizer: boolean = false;
  isExtensionVisible : boolean = false;
  availableTags: string[] = [];
  selectedTags: string[] = [];
  showOnlyMyEvents: boolean = false;


  openExtension() {
    console.log("openExtension() in all-events")
    this.isExtensionVisible = true;
  }

  constructor(private router: Router,
              private eventService: EventService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadEvents();
    this.loadAllTags();
    this.getUserRole();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: events => {
        console.log(events)
        this.events = events;
      },
      complete: () => {
        this.filteredEvents = this.events;
      },
      error: err => {
        console.log("error: " + err);
      }
    });
  }

  loadAllTags() {
    this.eventService.getAllTags().subscribe({
      next: response => {
        console.log("response = " + response)
        this.availableTags = response;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
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

  isDropdownOpen: boolean = false;

  toggleDropdown(dropdown: any): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    dropdown.classList.toggle('show');
  }

  toggleTagSelection(tag: string, eventObj: any): void {
    eventObj.preventDefault(); // Prevent the default behavior

    if (this.isTagSelected(tag)) {
      this.selectedTags = this.selectedTags.filter(selectedTag => selectedTag !== tag);
    } else {
      this.selectedTags.push(tag);
    }

    this.filterEventsByTags();
  }

  filterEventsByTags(): void {
    if (this.selectedTags.length === 0) {
      // No tags selected, show all events
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(event =>
        this.selectedTags.every(selectedTag =>
          event.tags.some(tag => tag.name === selectedTag)
        )
      );
    }
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  filterEventsByUser(): void {
    console.log("toggle = " + this.showOnlyMyEvents)
    if (this.showOnlyMyEvents) {
      this.eventService.getCurrentUserEvents().subscribe({
        next: response => {
          this.filteredEvents = response;
        }
      })
    } else {
      this.loadEvents();
    }
  }
}
