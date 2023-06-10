import {UserInfo} from "./UserInfo";

export class Report {
  id: number;
  reportedUser: UserInfo;
  reportingUser: UserInfo;
  date: Date;
  comment: string;
}
