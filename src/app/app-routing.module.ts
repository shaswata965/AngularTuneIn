import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { AlbumsComponent } from "./layouts/albums/albums.component";
import { FilterComponent } from "./layouts/filter/filter.component";
import { SingleAlbumComponent } from "./layouts/single-album/single-album.component";
import { BackendHomeComponent } from "./layouts/backend-home/backend-home.component";

const routes: Routes = [
  {
    path:'',
    component:LandingComponent
  },
  {
    path:'profile',
    component:ProfileComponent
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
    component:BackendHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
