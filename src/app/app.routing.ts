import { Routes } from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {AllEventsComponent} from "./components/all-events/all-events.component";
import {EventComponent} from "./components/event/event.component";

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'all-events', component: AllEventsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'event/:id', component: EventComponent },
  { path: '**', redirectTo: '/home' }
];
