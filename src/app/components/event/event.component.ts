import {Component, Input, OnInit} from '@angular/core';
import {DateTransformerPipe} from "../../pipes/date-transformer.pipe";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() title: string;
  @Input() date: Date;
  @Input() venueName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
