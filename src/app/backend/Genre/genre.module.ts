import {NgModule} from "@angular/core";
import {CreateGenreComponent} from "../../layouts/create-genre/create-genre.component";
import {ViewGenreComponent} from "../../layouts/view-genre/view-genre.component";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {GenreCreateComponent} from "./genre-create/genre-create.component";
import {GenreViewComponent} from "./genre-view/genre-view.component";
import {GenreListComponent} from "./genre-list/genre-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    GenreCreateComponent,
    GenreViewComponent,
    CreateGenreComponent,
    ViewGenreComponent,
    GenreListComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [GenreListComponent]
})

export class GenreModule{}
