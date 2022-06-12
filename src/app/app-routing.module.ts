import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { AlbumsComponent } from "./layouts/albums/albums.component";
import { FilterComponent } from "./layouts/filter/filter.component";
import { SingleAlbumComponent } from "./layouts/single-album/single-album.component";
import { BackendHomeComponent } from "./layouts/backend-home/backend-home.component";
import { BackendLoginComponent } from "./backend/backend-landing/backend-login/backend-login.component";
import { AdminCreateComponent } from "./layouts/admin-create/admin-create.component";
import { BackendUserListComponent } from "./layouts/backend-user-list/backend-user-list.component";
import {GeneralUserListComponent} from "./layouts/general-user-list/general-user-list.component";
import { CreateAlbumComponent } from "./layouts/create-album/create-album.component";
import {ViewAlbumComponent} from "./layouts/view-album/view-album.component";
import { CreateLanguageComponent } from "./layouts/create-language/create-language.component";
import { ViewLanguageComponent } from "./layouts/view-language/view-language.component";
import {AuthGuard} from "./frontend/auth/auth.guard";
import {BackAuthGuard} from "./frontend/auth/back-auth.guard";
import {CreateActorComponent} from "./layouts/create-actor/create-actor.component";
import {ViewActorComponent} from "./layouts/view-actor/view-actor.component";
import {CreateArtistComponent} from "./layouts/create-artist/create-artist.component";
import {ViewArtistComponent} from "./layouts/view-artist/view-artist.component";
import {CreateGenreComponent} from "./layouts/create-genre/create-genre.component";
import {ViewGenreComponent} from "./layouts/view-genre/view-genre.component";
import {CreateSongComponent} from "./layouts/create-song/create-song.component";
import {ViewSongComponent} from "./layouts/view-song/view-song.component";
import {ViewTaskComponent} from "./layouts/view-task/view-task.component";
import {CreateEventComponent} from "./layouts/create-event/create-event.component";
import {ViewEventComponent} from "./layouts/view-event/view-event.component";
import {ViewCalendarComponent} from "./layouts/view-calendar/view-calendar.component";
import {HistoryTaskComponent} from "./layouts/history-task/history-task.component";
import {CompletedTaskComponent} from "./layouts/completed-task/completed-task.component";
import {ReallocationTaskComponent} from "./layouts/reallocation-task/reallocation-task.component";
import {ViewContactsComponent} from "./layouts/view-contacts/view-contacts.component";
import {StarredContactsComponent} from "./layouts/starred-contacts/starred-contacts.component";
import {CreateAdComponent} from "./layouts/create-ad/create-ad.component";
import {ViewAdComponent} from "./layouts/view-ad/view-ad.component";
import {LanguageSongComponent} from "./layouts/language-song/language-song.component";
import {AllSongLayoutComponent} from "./layouts/all-song-layout/all-song-layout.component";
import {ViewIndustryComponent} from "./layouts/view-industry/view-industry.component";
import {CreateIndustryComponent} from "./layouts/create-industry/create-industry.component";
import {AllAlbumLayoutComponent} from "./layouts/all-album-layout/all-album-layout.component";
import {AlbumLanguageLayoutComponent} from "./layouts/album-language-layout/album-language-layout.component";
import {FilteredYearLayoutComponent} from "./layouts/filtered-year-layout/filtered-year-layout.component";
import {PageNotFoundComponent} from "./layouts/page-not-found/page-not-found.component";
import {ArtistAlbumsLayoutComponent} from "./layouts/artist-albums-layout/artist-albums-layout.component";
import {AllArtistAlbumsLayoutsComponent} from "./layouts/all-artist-albums-layouts/all-artist-albums-layouts.component";

const routes: Routes = [
  {
    path:'',
    component:LandingComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'albums',
    component:AlbumsComponent
  },
  {
    path:'albums/:industryId',
    component:AlbumsComponent
  },
  {
    path:'filter/:industryId',
    component:FilterComponent
  },
  {
    path:'filter-year/:industryId',
    component:FilteredYearLayoutComponent
  },
  {
    path: 'language-song/:languageId',
    component: LanguageSongComponent
  },
  {
    path: 'language-song',
    component: AllSongLayoutComponent
  },
  {
    path: 'language-album',
    component: AllAlbumLayoutComponent
  },
  {
    path: 'language-album/:languageId',
    component: AlbumLanguageLayoutComponent
  },  {
    path: 'artist-album',
    component: AllArtistAlbumsLayoutsComponent
  },
  {
    path: 'artist-album/:artistId',
    component: ArtistAlbumsLayoutComponent
  },
  {
    path:'singles',
    component:SingleAlbumComponent
  },
  {
    path:"backend-home",
    component:BackendHomeComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"backend-login",
    component:BackendLoginComponent
  },
  {
    path:"admin-create",
    component:AdminCreateComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"admin-edit/:adminId",
    component:AdminCreateComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-admin",
    component:BackendUserListComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-user",
    component:GeneralUserListComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-album",
    component:CreateAlbumComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-album",
    component:ViewAlbumComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-album/:albumId",
    component:CreateAlbumComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-language",
    component:CreateLanguageComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-language",
    component:ViewLanguageComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-language/:languageId",
    component:CreateLanguageComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-actor",
    component:CreateActorComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-actor/:actorId",
    component:CreateActorComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-actor",
    component:ViewActorComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-artist",
    component:CreateArtistComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-artist/:artistId",
    component:CreateArtistComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-artist",
    component:ViewArtistComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-genre",
    component:CreateGenreComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-genre/:genreId",
    component:CreateGenreComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-genre",
    component:ViewGenreComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-song",
    component:CreateSongComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-song/:songId",
    component:CreateSongComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-song",
    component:ViewSongComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-task",
    component:ViewTaskComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-event",
    component:CreateEventComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-event/:eventId",
    component:CreateEventComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-event",
    component:ViewEventComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-calendar",
    component:ViewCalendarComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"task-history",
    component:HistoryTaskComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"task-accepted",
    component:CompletedTaskComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"task-reallocation/:taskId",
    component:ReallocationTaskComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"contacts",
    component:ViewContactsComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"contacts-starred",
    component:StarredContactsComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-ad",
    component:CreateAdComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-ad/:adId",
    component:CreateAdComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-ad",
    component:ViewAdComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"create-industry",
    component:CreateIndustryComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"edit-industry/:adId",
    component:CreateIndustryComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"view-industry",
    component:ViewIndustryComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:'**',
    pathMatch: 'full',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, BackAuthGuard]
})
export class AppRoutingModule { }
