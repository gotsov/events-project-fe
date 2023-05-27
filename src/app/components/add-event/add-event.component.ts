import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Event} from "../../models/Event";
import {Tag} from "../../models/Tag";
import {Venue} from "../../models/Venue";
import {EventService} from "../../services/event.service";
import {response} from "express";
import {FormatDatePipe} from "../../pipes/format-date.pipe";
import {Time} from "@angular/common";

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private eventService: EventService) {
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

  startTime: Time;

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    console.log(this.event);
    this.eventService.add(this.event).subscribe(
      response => {
        console.log('Event added successfully:', response);
      }
    );
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

  // formatStartDate(date: Date) {
  //   this.formattedStartDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  // }
}
