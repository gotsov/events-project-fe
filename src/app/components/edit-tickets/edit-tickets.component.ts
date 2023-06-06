import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Sector} from "../../models/Sector";
import {Venue} from "../../models/Venue";
import {SectorService} from "../../services/sector.service";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'edit-tickets',
  templateUrl: './edit-tickets.component.html',
  styleUrls: ['./edit-tickets.component.css']
})
export class EditTicketsComponent implements OnInit {

  @Output() closeEditTickets: EventEmitter<void> = new EventEmitter<void>();
  // @Output() refreshMainModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() venue: Venue;

  selectedSector: Sector;
  selectedSectorNameSelect: string = '';
  selectedSectors: Sector[] = [];
  showAddNewSector: boolean = false;

  sectorToAdd: Sector = new Sector();
  newSectorName: string;
  newSectorNumberOfTickets: number;
  newSectorPrice: number;
  totalNumberOfTickets: number = 0;
  totalPrice: number = 0;

  constructor(private sectorService: SectorService,
              private venueService: VenueService) { }

  ngOnInit(): void {
    console.log(this.venue)
  }

  addNewSectorToSelected(): void {
    console.log(this.selectedSector);
    if (!this.selectedSectors.includes(this.selectedSector) && this.selectedSector != null) {
      console.log("in if()")
      this.selectedSectors.push(this.selectedSector);
      this.totalNumberOfTickets += this.selectedSector.numberOfTickets;
      this.totalPrice += this.selectedSector.price * this.selectedSector.numberOfTickets;
    }

    this.selectedSector = null;
  }

  addNewSector() {
    this.sectorToAdd.name = this.newSectorName;
    this.sectorToAdd.numberOfTickets = this.newSectorNumberOfTickets;
    this.sectorToAdd.price = this.newSectorPrice;
    this.sectorService.add(this.sectorToAdd, this.venue.id).subscribe({
      next: () => {

      },
      complete: () => {
        this.cleanInput();
        this.reloadVenue();
        this.showAddNewSector = !this.showAddNewSector;
      }
    })
  }

  reloadVenue() {
    this.venueService.getById(this.venue.id).subscribe({
      next: response => {
        this.venue = response;
      }
    })
  }

  cleanInput() {
    this.newSectorName = '';
    this.newSectorNumberOfTickets = 0;
    this.newSectorPrice = 0;
  }

  onSelectedSectorChanged(sectorName: string): void {
    const selectedSector = this.venue.sectors.find(sector => sector.name === sectorName);

    this.selectedSector = selectedSector;
  }

  removeSector(sector: Sector): void {
    const index = this.selectedSectors.indexOf(sector);
    if (index > -1) {
      this.totalNumberOfTickets -= sector.numberOfTickets;
      this.totalPrice -= sector.price * sector.numberOfTickets;
      this.selectedSectors.splice(index, 1);

    }
  }

  filterEventsByUser() {

  }

  save() {

  }

  close() {
    // this.refreshMainModal.emit();
    this.closeEditTickets.emit();
  }

}
