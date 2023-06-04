import {Component, Input, OnInit} from '@angular/core';
import {DateTransformerPipe} from "../../pipes/date-transformer.pipe";

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() id : number;
  @Input() title: string;
  @Input() date: Date;
  @Input() venueName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
