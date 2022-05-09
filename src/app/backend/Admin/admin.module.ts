import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminCreateComponent} from "../../layouts/admin-create/admin-create.component";
import {BackendAdminListComponent} from "./backend-admin-list/backend-admin-list.component";
import {SignupComponent} from "./signup/signup.component";
import {ListViewComponent} from "./list-view/list-view.component";
import {BlandingModule} from "../backend-landing/blanding.module";
import {BackendUserListComponent} from "../../layouts/backend-user-list/backend-user-list.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AdminCreateComponent,
    BackendAdminListComponent,
    SignupComponent,
    BackendUserListComponent,
    ListViewComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [ListViewComponent]
})

export class AdminModule{}
