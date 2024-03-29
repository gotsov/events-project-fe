import {Venue} from "./Venue";
import {Tag} from "./Tag";
import {UserInfo} from "./UserInfo";
import {Ticket} from "./Ticket";

export interface Event {
  id: number,
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  venue: Venue;
  user: UserInfo;
  tags: Tag[];
  tickets: Ticket[];
}
