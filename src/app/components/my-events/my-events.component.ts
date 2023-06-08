import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";

@Component({
  selector: 'my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  myEvents: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getCurrentUserEvents().subscribe({
        next: response => {
          this.myEvents = response;
        }
      }
    );
  }

}
