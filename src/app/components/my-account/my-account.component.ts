import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userId: number;
  user: UserInfo;
  isAdminOrOrganizer: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id'));

      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.authService.getCurrentLoggedUser().subscribe({
      next: response => {
        this.user = response;
        this.isAdminOrOrganizer = response.role === 'ADMIN' || response.role === 'ORGANIZER';
      },
      error: err => {
        console.log(err)
      },
    })
  }

}
