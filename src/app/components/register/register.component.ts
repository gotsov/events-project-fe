import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {RegisterService} from "../../services/register.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  };

  confirmPassword: string;
  isOrganizer: boolean = false;
  constructor(private registerService: RegisterService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    console.log("password: " + this.user.password);
    if (this.user.password == this.confirmPassword) {

      if (this.isOrganizer) {
        this.user.role = "ORGANIZER";
      } else {
        this.user.role = "REGULAR";
      }

      this.registerService.register(this.user);
      this.login();
      // this.cleanInput();
    }
  }

  login(): void {
    let formData: FormData = new FormData();
    formData.append('username', this.user.email)
    formData.append("password", this.user.password)

    this.loginService.login(formData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Invalid username or password');
      }
    })
  }

  cleanInput(): void {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.password = '';
    this.user.phoneNumber = '';
    this.user.role = '';
  }
}
