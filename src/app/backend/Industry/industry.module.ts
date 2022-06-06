import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IndustryListComponent} from "./industry-list/industry-list.component";
import {RouterModule} from "@angular/router";
import {IndustryCreateComponent} from "./industry-create/industry-create.component";
import {IndustryViewComponent} from "./industry-view/industry-view.component";
import {CreateIndustryComponent} from "../../layouts/create-industry/create-industry.component";
import {ViewIndustryComponent} from "../../layouts/view-industry/view-industry.component";
import {NgModule} from "@angular/core";
import {BlandingModule} from "../backend-landing/blanding.module";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    IndustryCreateComponent,
    IndustryListComponent,
    IndustryViewComponent,
    CreateIndustryComponent,
    ViewIndustryComponent
  ],
  imports: [
    BlandingModule,
    RouterModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  entryComponents: [IndustryListComponent]
})

export class IndustryModule{}
