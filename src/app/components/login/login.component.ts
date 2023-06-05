import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {email: '', password: ''}
  constructor(private loginService: LoginService,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let formData: FormData = new FormData();
    formData.append('username', this.credentials.email)
    formData.append("password", this.credentials.password)

    this.loginService.login(formData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      complete: () => {
        this.authService.setUser();
      },
      error: () => {
        alert('Invalid username or password');
      }
    })
  }

}
