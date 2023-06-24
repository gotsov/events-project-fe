import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {BASE_URL} from "../../api.config";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): void {
    this.http.post(`${BASE_URL}/users/register`, user, {withCredentials: true}).subscribe();
  }
}
