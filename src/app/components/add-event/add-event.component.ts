import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Event} from "../../models/Event";
import {Tag} from "../../models/Tag";
import {Venue} from "../../models/Venue";
import {EventService} from "../../services/event.service";
import {response} from "express";
import {FormatDatePipe} from "../../pipes/format-date.pipe";
import {Time} from "@angular/common";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(private eventService: EventService,
              private venueService: VenueService) {
  }

  ngOnInit(): void {
    this.loadUserVenues();
  }

  event: Event = {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    venue: new Venue(),
    tags: new Array<Tag>()
  };
  tagInput: string;

  venues: Venue[];
  selectedVenue: string = '';

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    for (let v of this.venues) {
      if (this.selectedVenue === v.name) {
        this.event.venue = v;
      }
    }

    this.eventService.add(this.event).subscribe({
      next: response => {
        console.log('Event added successfully:', response);
      },
      complete: () => {
        console.log("in complete before refresh")
        this.refreshParent();
        this.close();
      },
      error: () => {
        console.log("in error before refresh")
        this.refreshParent();
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
    this.venueService.getAllVenuesCurrentUser().subscribe({
      next: result => {
        this.venues = result;
      }
    })
  }

  onVenueChange(event: any) {
    this.selectedVenue = event.target.value;
  }

  refreshParent() {
    this.refresh.emit();
  }
}
