import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(formData: FormData): void {
    this.http.post('http://localhost:8080/login', formData, { withCredentials: true}).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Invalid username or password');
      }
    })
  }
}
