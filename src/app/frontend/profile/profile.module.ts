import {NgModule} from "@angular/core";
import {ProfileDetailsComponent} from "./profile-details/profile-details.component";
import {ProfilePlaylistComponent} from "./profile-playlist/profile-playlist.component";
import {ProfileFavouriteComponent} from "./profile-favourite/profile-favourite.component";
import {ProfileComponent} from "../../layouts/profile/profile.component";
import {ProfileModalComponent} from "./profile-modal/profile-modal.component";
import {LandingModule} from "../landing/landing.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProfileDetailsComponent,
    ProfilePlaylistComponent,
    ProfileFavouriteComponent,
    ProfileComponent,
    ProfileModalComponent,
  ],
  imports: [
    LandingModule,
    RouterModule
  ]
})

export class ProfileModule{}
