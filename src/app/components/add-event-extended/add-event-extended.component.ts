import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {Tag} from "../../models/Tag";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'add-event-extended',
  templateUrl: './add-event-extended.component.html',
  styleUrls: ['./add-event-extended.component.css']
})
export class AddEventExtendedComponent implements OnInit {
  @Output() closeExtension: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshMainModal: EventEmitter<void> = new EventEmitter<void>();

  venue: Venue = {
    name: '',
    city: '',
    address: '',
    description: ''
  };

  constructor(private venueService: VenueService) { }

  ngOnInit(): void {
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
    this.closeExtension.emit();
  }
}
