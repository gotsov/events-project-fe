import {Venue} from "./Venue";
import {Tag} from "./Tag";

export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  venue: Venue;
  tags: Tag[];
}
