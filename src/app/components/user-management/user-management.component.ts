import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: UserInfo[] = [];
  showPendingOnly: boolean = false;
  showViewReport: boolean = false;
  selectedUser: UserInfo;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("ngOnInit IN user-management")
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: response => {
        this.users = response;
        this.sortUsersByRole();
      }
    });
  }

  sortUsersByRole() {
    this.users.sort((a, b) => {
      const roleOrder = {
        'PENDING': 0,
        'ORGANIZER': 1,
        'REGULAR': 2,
        'ADMIN': 3
      };

      return roleOrder[a.role] - roleOrder[b.role];
    });
  }

  acceptUser(user: UserInfo, decision: string) {
    this.userService.acceptUser(user.id, decision).subscribe({
      next: response => {
        console.log("acceptUser response: ")
        console.log(response);
      },
      complete: () => {
        this.loadUsers();
      }
    });
  }

  removeRights(user: UserInfo) {
    this.userService.demoteUser(user.id).subscribe({
      next: response => {
        console.log(response);
      },
      complete: () => {
        this.loadUsers();
      }
    });
  }

  openViewReports(user: UserInfo) {
    console.log("Clicked on user with ID:", user.id);
    this.selectedUser = user;
    this.showViewReport = true;
  }

  closeViewReport() {
    this.showViewReport = false;
  }
}
