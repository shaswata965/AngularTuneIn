import {NgModule} from "@angular/core";
import {AlbumFilterComponent} from "./album-filter/album-filter.component";
import {AlbumsComponent} from "../../layouts/albums/albums.component";
import {AlbumProfileComponent} from "./album-profile/album-profile.component";
import {AlbumSongsComponent} from "./album-songs/album-songs.component";
import {AlbumSuggestionsComponent} from "./album-suggestions/album-suggestions.component";
import {SingleAlbumComponent} from "../../layouts/single-album/single-album.component";
import {FilteredResultsComponent} from "./filtered-results/filtered-results.component";
import {FilterComponent} from "../../layouts/filter/filter.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LandingModule} from "../landing/landing.module";

@NgModule({
  declarations: [
    AlbumFilterComponent,
    AlbumsComponent,
    AlbumProfileComponent,
    AlbumSongsComponent,
    AlbumSuggestionsComponent,
    SingleAlbumComponent,
    FilteredResultsComponent,
    FilterComponent,
  ],
  imports : [
    CommonModule,
    RouterModule,
    LandingModule
  ]
})

export class AlbumModule {}
