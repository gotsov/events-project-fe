import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/Event";
import {Venue} from "../../models/Venue";
import {Tag} from "../../models/Tag";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId: string;
  event: Event = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    venue: new Venue(),
    tags: new Array<Tag>()
  };

  constructor(private route: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');

      this.loadEvent();
    });
  }

  loadEvent() {
    this.eventService.getById(this.eventId).subscribe({
      next: response => {
        this.event = response;
      }
    })
  }

}
