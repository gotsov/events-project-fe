import { Routes } from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {AllEventsComponent} from "./components/all-events/all-events.component";
import {EventComponent} from "./components/event/event.component";
import {MyAccountComponent} from "./components/my-account/my-account.component";

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'all-events', component: AllEventsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'event/:id', component: EventComponent },
  { path: 'my-account/:id', component: MyAccountComponent },
  { path: '**', redirectTo: '/home' }
];
