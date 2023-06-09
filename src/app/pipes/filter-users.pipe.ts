import { Pipe, PipeTransform } from '@angular/core';
import {UserInfo} from "../models/UserInfo";

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: UserInfo[], showPendingOnly: boolean): UserInfo[] {
    if (showPendingOnly) {
      return users.filter(user => user.role === 'PENDING');
    }
    return users;
  }
}
