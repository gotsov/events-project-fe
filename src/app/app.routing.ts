import { Routes } from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
