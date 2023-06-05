import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {Tag} from "../../models/Tag";
import {Sector} from "../../models/Sector";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId: string;
  event: Event = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    venue: new Venue(),
    tags: new Array<Tag>()
  };

  selectedVenue: Venue = {
    name: '',
    city: '',
    address: '',
    description: ''
  };

  selectedVenueValue: string = '';

  sectors: Sector[];
  venues: Venue[];

  isEditMode: boolean = false;
  isVenueSelected: boolean = false;
  showAddVenue: boolean = false;
  tagInput: string;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private venueService: VenueService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');

      this.loadEvent();
      this.loadSectors();
    });
  }

  loadEvent() {
    this.eventService.getById(this.eventId).subscribe({
      next: response => {
        this.event = response;
        this.selectedVenue = response.venue;
      }
    })
  }

  loadSectors() {

  }

  edit() {
    this.isEditMode = true;
    this.loadUserVenues();
    this.selectedVenueValue = this.event.venue.name;
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
    this.selectedVenueValue = event.target.value;
    this.isVenueSelected = true;

    this.venueService.getByName(this.selectedVenueValue).subscribe({
      next: venue => {
        this.selectedVenue = venue;
        this.event.venue = venue;
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

  saveChanges() {
    this.eventService.update(this.event).subscribe({
      next: response => {
        this.event = response;
      },
      complete: () => {
        this.isEditMode = false;
      }
    });
  }

  closeAddVenue() {
    this.showAddVenue = false;
  }

  onAddVenueRefresh() {
    this.loadUserVenues();
  }

  openAddEventClick(event: MouseEvent) {
    this.showAddVenue = true;
  }
}
