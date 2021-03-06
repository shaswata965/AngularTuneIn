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
import { LanguageComponent } from './language/language.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {StylePaginatorDirective} from "./language/style-paginator.directive";
import { AllSongComponent } from './all-song/all-song.component';
import { AllAlbumComponent } from './all-album/all-album.component';
import {AllAlbumLayoutComponent} from "../../layouts/all-album-layout/all-album-layout.component";
import { AlbumLanguageComponent } from './album-language/album-language.component';
import { FilteredYearComponent } from './filtered-year/filtered-year.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import {AllArtistAlbumsComponent} from "./all-artist-albums/all-artist-albums.component";
import {ClipboardModule} from "ngx-clipboard";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    LanguageComponent,
    StylePaginatorDirective,
    AllSongComponent,
    AllAlbumComponent,
    AllAlbumLayoutComponent,
    AlbumLanguageComponent,
    FilteredYearComponent,
    ArtistAlbumsComponent,
    AllArtistAlbumsComponent
  ],
  exports: [
    LanguageComponent,
    AllSongComponent,
    AllAlbumComponent,
    AlbumLanguageComponent,
    FilteredYearComponent,
    ArtistAlbumsComponent,
    AllArtistAlbumsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LandingModule,
    MatPaginatorModule,
    CarouselModule,
    ClipboardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    })
  ]
})

export class AlbumModule {}
