import {UserInfo} from "./UserInfo";
import {Sector} from "./Sector";
import {EventTicket} from "./EventTicket";

export class TicketFullInfo {
  id: number;
  event: EventTicket;
  sector: Sector;
  timeBought: Date;
  user: UserInfo;
}
