import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Event} from "../../models/Event";
import {Tag} from "../../models/Tag";
import {Venue} from "../../models/Venue";
import {EventService} from "../../services/event.service";
import {VenueService} from "../../services/venue.service";
import {Router} from "@angular/router";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  @Output() openExtension: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router,
              private eventService: EventService,
              private venueService: VenueService) {
  }

  ngOnInit(): void {
    this.loadUserVenues();
  }

  event: Event = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    venue: new Venue(),
    user: new UserInfo(),
    tags: [],
    tickets: []
  };
  tagInput: string;

  venues: Venue[];
  selectedVenue: string = '';
  isVenueSelected: boolean = false;
  showAddVenue: boolean = false;
  showSectorPopup: boolean = false;

  close() {
    this.refreshParent();
    this.closeModal.emit();
  }

  openAddEventClick(event: MouseEvent) {
    console.log("in openExtensionClick")
    this.showAddVenue = true;
  }

  openSectorClick(event: MouseEvent) {
    console.log("in openSectorClick")
    this.showSectorPopup = true;
  }

  closeAddVenue() {
    this.showAddVenue = false;
  }

  closeSector() {
    this.showSectorPopup = false;
  }

  onAddVenueRefresh() {
    this.loadUserVenues();
  }

  onSectorRefresh() {

  }

  onSubmit() {
    for (let v of this.venues) {
      if (this.selectedVenue === v.name) {
        this.event.venue = v;
      }
    }

    this.eventService.add(this.event).subscribe({
      next: response => {
        console.log('In add() event');
        console.log("event.id = " + response.id);
        console.log("event.name = " + response.name);
        const newEventId = response.id;
        console.log('Event added successfully:', response);
        this.router.navigate(['/event', newEventId]);
      },
      complete: () => {
        console.log("in complete before refresh")
        this.close();
      },
      error: () => {
        console.log("in error before refresh")
        this.close();
      }
      });
  }

  addTag(){
    if (this.tagInput != '') {
      let tag = new Tag();
      tag.name = this.tagInput;

      this.event.tags.push(tag);
      this.tagInput = '';
    }
  }

  removeTag(tag) {
    const index = this.event.tags.indexOf(tag);
    if (index !== -1) {
      this.event.tags.splice(index, 1);
    }
  }

  loadUserVenues() {
    console.log("in loadUserVenues()")
    this.venueService.getAllVenuesCurrentUser().subscribe({
      next: result => {
        this.venues = result;
      }
    })
  }

  onVenueChange(event: any) {
    this.selectedVenue = event.target.value;
    this.isVenueSelected = true;
  }

  refreshParent() {
    this.refresh.emit();
  }
}
