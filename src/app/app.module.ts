import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { DateTransformerPipe } from './pipes/date-transformer.pipe';
import { AddEventComponent } from './components/add-event/add-event.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormatDatePipe } from './pipes/format-date.pipe';
import { AddEventVenueComponent } from './components/add-event-venue/add-event-venue.component';
import { AddEventSectorComponent } from './components/add-event-sector/add-event-sector.component';
import { EventComponent } from './components/event/event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AllEventsComponent,
    EventCardComponent,
    DateTransformerPipe,
    AddEventComponent,
    FormatDatePipe,
    AddEventVenueComponent,
    AddEventSectorComponent,
    EventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
