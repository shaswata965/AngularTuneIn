import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from "ng2-charts";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
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
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

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
import { ProfileModalComponent } from './frontend/profile-modal/profile-modal.component';
import { AlbumCreateComponent } from './backend/album-create/album-create.component';
import { AlbumViewComponent } from './backend/album-view/album-view.component';
import { AlbumListComponent } from './backend/album-list/album-list.component';
import { CreateAlbumComponent } from './layouts/create-album/create-album.component';
import { ViewAlbumComponent } from './layouts/view-album/view-album.component';
import { LanguageCreateComponent } from './backend/language-create/language-create.component';
import { LanguageViewComponent } from './backend/language-view/language-view.component';
import { CreateLanguageComponent } from './layouts/create-language/create-language.component';
import { ViewLanguageComponent } from './layouts/view-language/view-language.component';
import { LanguageListComponent } from './backend/language-list/language-list.component';
import { ActorCreateComponent } from './backend/actor-create/actor-create.component';
import { CreateActorComponent } from './layouts/create-actor/create-actor.component';
import { ActorViewComponent } from './backend/actor-view/actor-view.component';
import { ActorListComponent } from './backend/actor-list/actor-list.component';
import { ViewActorComponent } from './layouts/view-actor/view-actor.component';
import { ArtistCreateComponent } from './backend/artist-create/artist-create.component';
import { CreateArtistComponent } from './layouts/create-artist/create-artist.component';
import { ArtistViewComponent } from './backend/artist-view/artist-view.component';
import { ViewArtistComponent } from './layouts/view-artist/view-artist.component';
import { ArtistListComponent } from './backend/artist-list/artist-list.component';
import { GenreCreateComponent } from './backend/genre-create/genre-create.component';
import { GenreViewComponent } from './backend/genre-view/genre-view.component';
import { GenreListComponent } from './backend/genre-list/genre-list.component';
import { CreateGenreComponent } from './layouts/create-genre/create-genre.component';
import { ViewGenreComponent } from './layouts/view-genre/view-genre.component';
import { SongCreateComponent } from './backend/song-create/song-create.component';
import { SongListComponent } from './backend/song-list/song-list.component';
import { SongViewComponent } from './backend/song-view/song-view.component';
import { CreateSongComponent } from './layouts/create-song/create-song.component';
import { ViewSongComponent } from './layouts/view-song/view-song.component';
import {SanitizeUrlPipe} from "./backend/song-create/sanitize-url.pipe";


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
        GeneralUserViewComponent,
        ProfileModalComponent,
        AlbumCreateComponent,
        AlbumViewComponent,
        AlbumListComponent,
        CreateAlbumComponent,
        ViewAlbumComponent,
        LanguageCreateComponent,
        LanguageViewComponent,
        CreateLanguageComponent,
        ViewLanguageComponent,
        LanguageListComponent,
        ActorCreateComponent,
        CreateActorComponent,
        ActorViewComponent,
        ActorListComponent,
        ViewActorComponent,
        ArtistCreateComponent,
        CreateArtistComponent,
        ArtistViewComponent,
        ViewArtistComponent,
        ArtistListComponent,
        GenreCreateComponent,
        GenreViewComponent,
        GenreListComponent,
        CreateGenreComponent,
        ViewGenreComponent,
        SongCreateComponent,
        SongListComponent,
        SongViewComponent,
        CreateSongComponent,
        ViewSongComponent,
        SanitizeUrlPipe
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
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule
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
  entryComponents: [ListViewComponent, GeneralUserViewComponent, AlbumListComponent, LanguageListComponent, ActorListComponent, ArtistListComponent, GenreListComponent, SongListComponent]
})
export class AppModule { }
