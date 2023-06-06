import {Sector} from "./Sector";

export class Venue {
  id: number;
  name: string;
  city: string;
  address: string;
  description: string;
  sectors: Sector[];
}
