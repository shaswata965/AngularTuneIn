import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {ViewContactsComponent} from "../../layouts/view-contacts/view-contacts.component";
import {StarredContactsComponent} from "../../layouts/starred-contacts/starred-contacts.component";
import {ContactViewComponent} from "./contact-view/contact-view.component";
import {ContactStarredComponent} from "./contact-starred/contact-starred.component";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ContactViewComponent,
    ContactStarredComponent,
    ViewContactsComponent,
    StarredContactsComponent,
    ContactListComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    BrowserModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [ContactListComponent]
})

export class ContactModule{}
