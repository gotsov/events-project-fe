import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  filteredEvents: Event[];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number;

  showModal: boolean = false;
  isAdminOrOrganizer: boolean = false;
  isExtensionVisible : boolean = false;
  availableTags: string[] = [];
  selectedTags: string[] = [];
  showOnlyMyEvents: boolean = false;
  isDropdownOpen: boolean = false;
  isSortAscending: boolean = true;
  sortByDate: boolean = false;
  isUpcoming: boolean = false;
  searchString: string = '';

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
        this.events = events;
      },
      complete: () => {
        this.filteredEvents = this.events;
        this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);

        const currentDate = new Date();
        this.filteredEvents = this.filteredEvents.filter(event => new Date(event.startDate) >= currentDate);

        this.filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      },
      error: err => {
        console.log("error: " + err);
      }
    });
  }

  loadAllTags() {
    this.eventService.getAllTags().subscribe({
      next: response => {
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
    this.showOnlyMyEvents = !this.showOnlyMyEvents;
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

  sortEventsByUpcoming() {
    if (this.isUpcoming) {
      this.isUpcoming = !this.isUpcoming;
      const currentDate = new Date();
      this.filteredEvents = this.filteredEvents.filter(event => new Date(event.startDate) >= currentDate);
    } else {
      this.isUpcoming = true;
      this.filteredEvents = this.events;
    }

  }

  toggleSortByDate() {
    if (this.sortByDate) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.isSortAscending = true;
      this.sortByDate = true;
    }
    this.sortEvents();
  }

  sortEvents() {
    if (this.sortByDate) {
      if (this.isSortAscending) {
        this.filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      } else {
        this.filteredEvents.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      }
    }
  }

  searchEvents() {
    this.filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  getPaginatedEvents(): Event[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  isPreviousEnabled(): boolean {
    console.log("isPreviousEnabled()   ")
    console.log("this.currentPage")
    console.log(this.currentPage)
    if (this.currentPage === 1) {
      console.log("IN IF")
      return true;
    } else if (this.filteredEvents.length <= 9) {
      return true;
    }

    return false;
  }

  isNextEnabled(): boolean {
    if (this.currentPage === this.totalPages) {
      return true;
    } else if (this.filteredEvents.length <= 9) {
      return true;
    }

    return false;
  }
}
