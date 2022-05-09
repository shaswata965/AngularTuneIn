import {NgModule} from "@angular/core";
import {AdCreateComponent} from "./ad-create/ad-create.component";
import {AdListComponent} from "./ad-list/ad-list.component";
import {AdViewComponent} from "./ad-view/ad-view.component";
import {CreateAdComponent} from "../../layouts/create-ad/create-ad.component";
import {ViewAdComponent} from "../../layouts/view-ad/view-ad.component";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AdCreateComponent,
    AdViewComponent,
    CreateAdComponent,
    ViewAdComponent,
    AdListComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [AdListComponent]
})

export class AdModule{}
