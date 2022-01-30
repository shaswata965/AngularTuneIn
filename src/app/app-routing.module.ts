import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { AlbumsComponent } from "./layouts/albums/albums.component";
import { FilterComponent } from "./layouts/filter/filter.component";
import { SingleAlbumComponent } from "./layouts/single-album/single-album.component";
import { BackendHomeComponent } from "./layouts/backend-home/backend-home.component";
import { BackendLoginComponent } from "./backend/backend-login/backend-login.component";
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
    path:'filter',
    component:FilterComponent
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
    path:"admin-list",
    component:BackendUserListComponent,
    canActivate: [BackAuthGuard]
  },
  {
    path:"user-list",
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, BackAuthGuard]
})
export class AppRoutingModule { }
