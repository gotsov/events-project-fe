import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Venue} from "../../models/Venue";
import {Sector} from "../../models/Sector";
import {SectorService} from "../../services/sector.service";

@Component({
  selector: 'add-event-sector',
  templateUrl: './add-event-sector.component.html',
  styleUrls: ['./add-event-sector.component.css']
})
export class AddEventSectorComponent implements OnInit {

  @Output() closeSector: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshMainModal: EventEmitter<void> = new EventEmitter<void>();

  sector: Sector = {
    name: '',
    price: 0,
    numberOfTickets: 0
  };
  constructor(private sectorService: SectorService) { }

  ngOnInit(): void {
  }

  save() {
    // this.venueService.add(this.venue).subscribe({
    //   next: response => {
    //     console.log('Venue added successfully:', response);
    //   },
    //   complete: () => {
    //     console.log("in complete after venueService.add.subscribe")
    //     this.close();
    //   },
    //   error: () => {
    //     console.log("in error after venueService.add.subscribe")
    //     this.close();
    //   }
    // });
    this.close();
  }

  close() {
    this.refreshMainModal.emit();
    this.closeSector.emit();
  }
}
