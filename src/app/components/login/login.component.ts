import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {email: '', password: ''}
  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    let formData: FormData = new FormData();
    formData.append('username', this.credentials.email)
    formData.append("password", this.credentials.password)
    console.log(this.credentials.email + " : " + this.credentials.password)

    this.loginService.login(formData)
  }

}
