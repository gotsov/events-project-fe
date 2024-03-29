import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {UserInfo} from "../../models/UserInfo";
import {Tag} from "../../models/Tag";
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
    tags: [],
    tickets: []
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
  showBuyTickets: boolean = false;
  isAdminOrOrganizer: boolean = false;
  tagInput: string;
  buyTicketText: string;
  buyTicketsActive: boolean = false;
  showReportUser: boolean = false;
  showPopup: boolean = false;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private venueService: VenueService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = parseInt(params.get('id'));

      this.loadEvent();
      this.getUserRole();
    });
  }

  loadEvent() {
    this.eventService.getById(this.eventId).subscribe({
      next: response => {
        console.log("loadEvent()")
        this.event = response;
        this.selectedVenue = response.venue;
      },
      complete: () => {
        this.setBuyTicketTextAndStatus();
      }
    })
  }

  private setBuyTicketTextAndStatus() {
    this.authService.getCurrentLoggedUser().subscribe({
      complete: () => {
        if (new Date(this.event.endDate) < new Date()) {
          this.buyTicketText = 'Отминало събитие';
          this.buyTicketsActive = false;
        } else if (this.event.tickets.length === 0) {
          this.buyTicketText = 'Няма билети за това събитие';
          this.buyTicketsActive = false;
        } else if (this.event.tickets.pop().sector.name === 'free') {
          this.buyTicketText = 'Вземи безплатен билет';
          this.buyTicketsActive = true;
        } else {
          this.buyTicketText = 'Купи билет';
          this.buyTicketsActive = true;
        }
      },
      error: err => {
        this.buyTicketText = 'Влезте в профила си';
      }
    })

  }

  edit() {
    this.isEditMode = true;
    this.showBuyTickets = false;
    this.loadUserVenues();
    this.selectedVenueValue = this.event.venue.name;
  }

  deleteEvent() {
    this.eventService.delete(this.event.id).subscribe({
      next: response => {
        console.log(response);
      },
      complete: () => {
        this.router.navigate(['/home']);
      }
    });
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
    this.showPopup = true;
  }

  confirmChanges() {
    this.eventService.update(this.event).subscribe({
      next: response => {
        this.event = response;
      },
      complete: () => {
        this.isEditMode = false;
        this.loadEvent();
        this.showPopup = false;
      }
    });
  }

  cancelChanges() {
    this.showPopup = false;
  }

  closeAddVenue() {
    this.showAddVenue = false;
  }

  closeEditTickets() {
    this.showEditTickets = false;
  }

  closeBuyTickets(){
    this.showBuyTickets = false;
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

  openBuyTicketsClick(event: MouseEvent) {
    if (this.showBuyTickets) {
      this.closeBuyTickets();
    } else {
      this.showBuyTickets = true;
    }
  }

  getUserRole() {
    console.log("getUserRole in all-events")
    this.authService.isUserEventOrganizer(this.eventId).subscribe({
      next: response => {
        this.isAdminOrOrganizer = response;
      },
      error: err => {
        console.log(err)
      },
    })
  }

  openReportUser() {
    this.showReportUser = true;
  }

  closeReportUser() {
    this.showReportUser = false;
  }
}
