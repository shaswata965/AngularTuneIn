import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
