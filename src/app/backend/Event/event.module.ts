import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {CreateEventComponent} from "../../layouts/create-event/create-event.component";
import {ViewEventComponent} from "../../layouts/view-event/view-event.component";
import {ViewCalendarComponent} from "../../layouts/view-calendar/view-calendar.component";
import {EventCreateComponent} from "./event-create/event-create.component";
import {EventViewComponent} from "./event-view/event-view.component";
import {CalendarViewComponent} from "./calendar-view/calendar-view.component";
import {EventListComponent} from "./event-list/event-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    EventCreateComponent,
    EventViewComponent,
    CreateEventComponent,
    ViewEventComponent,
    CalendarViewComponent,
    ViewCalendarComponent,
    EventListComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  entryComponents: [EventListComponent]
})

export class EventModule{}
