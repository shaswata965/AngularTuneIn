import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from "ng2-charts";
import { MetismenuAngularModule } from "@metismenu/angular";

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './frontend/header/header.component';
import { FooterComponent } from './frontend/footer/footer.component';
import { HomeComponent } from './frontend/home/home.component';
import { QuickLinksComponent } from './frontend/quick-links/quick-links.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './layouts/landing/landing.component';
import { ProfileDetailsComponent } from './frontend/profile-details/profile-details.component';
import { ProfilePlaylistComponent } from './frontend/profile-playlist/profile-playlist.component';
import { ProfileFavouriteComponent } from './frontend/profile-favourite/profile-favourite.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { AlbumFilterComponent } from './frontend/album-filter/album-filter.component';
import { AlbumsComponent } from './layouts/albums/albums.component';
import { FilteredResultsComponent } from './frontend/filtered-results/filtered-results.component';
import { FilterComponent } from './layouts/filter/filter.component';
import { AlbumProfileComponent } from './frontend/album-profile/album-profile.component';
import { AlbumSongsComponent } from './frontend/album-songs/album-songs.component';
import { AlbumSuggestionsComponent } from './frontend/album-suggestions/album-suggestions.component';
import { SingleAlbumComponent } from './layouts/single-album/single-album.component';
import { DownloadEarningComponent } from './backend/download-earning/download-earning.component';
import { MonthlyInvoiceComponent } from './backend/monthly-invoice/monthly-invoice.component';
import { GlobalDateLocationComponent } from './backend/global-date-location/global-date-location.component';
import { AccountDetailsComponent } from './backend/account-details/account-details.component';
import { RevenueDetailsComponent } from './backend/revenue-details/revenue-details.component';
import { BackendHomeComponent } from './layouts/backend-home/backend-home.component';
import { BackendHeaderComponent } from './backend/backend-header/backend-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QuickLinksComponent,
    LandingComponent,
    ProfileDetailsComponent,
    ProfilePlaylistComponent,
    ProfileFavouriteComponent,
    ProfileComponent,
    AlbumFilterComponent,
    AlbumsComponent,
    FilteredResultsComponent,
    FilterComponent,
    AlbumProfileComponent,
    AlbumSongsComponent,
    AlbumSuggestionsComponent,
    SingleAlbumComponent,
    DownloadEarningComponent,
    MonthlyInvoiceComponent,
    GlobalDateLocationComponent,
    AccountDetailsComponent,
    RevenueDetailsComponent,
    BackendHomeComponent,
    BackendHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MetismenuAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
