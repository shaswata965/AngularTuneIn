import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {CreateSongComponent} from "../../layouts/create-song/create-song.component";
import {ViewSongComponent} from "../../layouts/view-song/view-song.component";
import {SongCreateComponent} from "./song-create/song-create.component";
import {SongListComponent} from "./song-list/song-list.component";
import {SongViewComponent} from "./song-view/song-view.component";
import {SanitizeUrlPipe} from "./song-create/sanitize-url.pipe";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    SongCreateComponent,
    SongViewComponent,
    CreateSongComponent,
    ViewSongComponent,
    SanitizeUrlPipe,
    SongListComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [SongListComponent]
})

export class SongModule{}
