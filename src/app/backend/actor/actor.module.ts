import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ActorCreateComponent} from "./actor-create/actor-create.component";
import {CreateActorComponent} from "../../layouts/create-actor/create-actor.component";
import {ActorViewComponent} from "./actor-view/actor-view.component";
import {ActorListComponent} from "./actor-list/actor-list.component";
import {ViewActorComponent} from "../../layouts/view-actor/view-actor.component";
import {BlandingModule} from "../backend-landing/blanding.module";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    ActorCreateComponent,
    CreateActorComponent,
    ActorViewComponent,
    ActorListComponent,
    ViewActorComponent,
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    BrowserModule
  ],
  entryComponents : [ActorListComponent]
})

export class ActorModule{}
