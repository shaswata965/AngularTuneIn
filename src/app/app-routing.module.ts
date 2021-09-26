import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './layouts/landing/landing.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import {AlbumsComponent} from "./layouts/albums/albums.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
