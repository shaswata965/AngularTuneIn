import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from "ng2-charts";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

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
import { BackendHomeComponent } from './layouts/backend-home/backend-home.component';
import { BackendHeaderComponent } from './backend/backend-header/backend-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { BackendLoginComponent } from './backend/backend-login/backend-login.component';
import { PlayerComponentComponent } from './frontend/player-component/player-component.component';
import {AuthInterceptor} from "./frontend/interceptor/auth-interceptor";
import { SignupComponent } from './backend/admin-signup/signup/signup.component';
import {BackAuthInterceptor} from "./frontend/interceptor/back-auth-interceptor";
import { BackendBodyComponent } from './backend/backend-body/backend-body.component';
import { BackendFooterComponent } from './backend/backend-footer/backend-footer.component';
import { BackendDashboardComponent } from './backend/backend-dashboard/backend-dashboard.component';
import { AdminCreateComponent } from './layouts/admin-create/admin-create.component';
import { BackendAdminListComponent } from './backend/backend-admin-list/backend-admin-list.component';
import { BackendUserListComponent } from './layouts/backend-user-list/backend-user-list.component';
import { UserListComponent } from './backend/user-list/user-list.component';
import { GeneralUserListComponent } from './layouts/general-user-list/general-user-list.component';
import { ListViewComponent } from './backend/list-view/list-view.component';
import { GeneralUserViewComponent } from './backend/general-user-view/general-user-view.component';


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
    BackendHomeComponent,
    BackendHeaderComponent,
    BackendLoginComponent,
    PlayerComponentComponent,
    SignupComponent,
    BackendBodyComponent,
    BackendFooterComponent,
    BackendDashboardComponent,
    AdminCreateComponent,
    BackendAdminListComponent,
    BackendUserListComponent,
    UserListComponent,
    GeneralUserListComponent,
    ListViewComponent,
    GeneralUserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BackAuthInterceptor, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '226540024838-3eirbl2ngnsc4tfe08rn13o9760s2vb9.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1654437441393505'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent],
  entryComponents: [ListViewComponent, GeneralUserViewComponent]
})
export class AppModule { }
