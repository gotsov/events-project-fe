import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {response} from "express";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.css']
})
export class MyInformationComponent implements OnInit {

  user: UserInfo;
  userRoleTranslate: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.authService.getCurrentLoggedUser().subscribe({
      next: response => {
        this.user = response;
      },
      complete: () => {
        this.setUserRoleText();
      }
    });
  }

  setUserRoleText() {
    switch (this.user.role) {
      case 'ADMIN' :
        this.userRoleTranslate = "Администратор";
        break;
      case 'ORGANIZER':
        this.userRoleTranslate = "Организатор";
        break;
      case 'REGULAR':
        this.userRoleTranslate = "Обикновен потребител";
        break;
    }
  }
}
