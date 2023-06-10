import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {response} from "express";
import {UserInfo} from "../../models/UserInfo";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.css']
})
export class MyInformationComponent implements OnInit {

  user: UserInfo;
  userRoleTranslate: string;
  requestOrganizerButtonText: string;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
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
        this.requestOrganizerButtonText = "Имате организаторски права";
        break;
      case 'ORGANIZER':
        this.userRoleTranslate = "Организатор";
        this.requestOrganizerButtonText = "Имате организаторски права";
        break;
      case 'REGULAR':
        this.userRoleTranslate = "Обикновен потребител";
        this.requestOrganizerButtonText = "Заяви организаторски права";
        break;
    }
  }

  requestOrganizerRights() {
    this.userService.requestOrganizer().subscribe({
      next: response => {
        console.log(response);
      },
      complete: () => {
        this.loadUser();
        this.requestOrganizerButtonText = "Успешно изпратихте заявка";
      }
    })
  }
}
