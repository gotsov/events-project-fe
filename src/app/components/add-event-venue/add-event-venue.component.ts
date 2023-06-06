import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {Tag} from "../../models/Tag";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'add-event-venue',
  templateUrl: './add-event-venue.component.html',
  styleUrls: ['./add-event-venue.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddEventVenueComponent implements OnInit {
  @Output() closeAddVenue: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshMainModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() caller: string;

  venue: Venue = {
    id: 0,
    name: '',
    city: '',
    address: '',
    description: '',
    sectors: []
  };

  constructor(private venueService: VenueService) { }

  ngOnInit(): void {
    console.log("ngOnInit in add-venue-popup");
  }

  save() {
    this.venueService.add(this.venue).subscribe({
      next: response => {
        console.log('Venue added successfully:', response);
      },
      complete: () => {
        console.log("in complete after venueService.add.subscribe")
        this.close();
      },
      error: () => {
        console.log("in error after venueService.add.subscribe")
        this.close();
      }
    });
  }

  close() {
    this.refreshMainModal.emit();
    this.closeAddVenue.emit();
  }
}
