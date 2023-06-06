import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {UserInfo} from "../../models/UserInfo";
import {Tag} from "../../models/Tag";
import {Sector} from "../../models/Sector";
import {VenueService} from "../../services/venue.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId: number;
  event: Event = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    venue: new Venue(),
    user: new UserInfo(),
    tags: new Array<Tag>()
  };

  selectedVenue: Venue = {
    id: 0,
    name: '',
    city: '',
    address: '',
    description: '',
    sectors: []
  };

  selectedVenueValue: string = '';

  venues: Venue[];

  isEditMode: boolean = false;
  isVenueSelected: boolean = false;
  showAddVenue: boolean = false;
  showEditTickets: boolean = false;
  isAdminOrOrganizer: boolean = false;
  tagInput: string;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private venueService: VenueService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = parseInt(params.get('id'));

      this.loadEvent();
      this.loadSectors();
      this.getUserRole();
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

  closeEditTickets() {
    this.showEditTickets = false;
  }

  onAddVenueRefresh() {
    this.loadUserVenues();
  }

  openAddEventClick(event: MouseEvent) {
    this.showAddVenue = true;
  }

  openEditTicketsClick(event: MouseEvent) {
    this.showEditTickets = true;
  }

  getUserRole() {
    console.log("getUserRole in all-events")
    this.authService.isUserEventOrganizer(this.eventId).subscribe({
      next: response => {
        console.log("response = " + response)
        this.isAdminOrOrganizer = response;
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
