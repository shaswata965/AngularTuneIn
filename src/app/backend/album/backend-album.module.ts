import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {CreateAlbumComponent} from "../../layouts/create-album/create-album.component";
import {ViewAlbumComponent} from "../../layouts/view-album/view-album.component";
import {AlbumCreateComponent} from "./album-create/album-create.component";
import {AlbumViewComponent} from "./album-view/album-view.component";
import {AlbumListComponent} from "./album-list/album-list.component";
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
import {LanguageSongComponent} from "../../layouts/language-song/language-song.component";
import {AllSongLayoutComponent} from "../../layouts/all-song-layout/all-song-layout.component";
import {LandingModule} from "../../frontend/landing/landing.module";
import {AlbumModule} from "../../frontend/album/album.module";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AlbumCreateComponent,
    AlbumViewComponent,
    CreateAlbumComponent,
    ViewAlbumComponent,
    AlbumListComponent,
    LanguageSongComponent,
    AllSongLayoutComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
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
    LandingModule,
    AlbumModule,
    MatPaginatorModule
  ],
  entryComponents: [AlbumListComponent]
})

export class BackendAlbumModule{}
