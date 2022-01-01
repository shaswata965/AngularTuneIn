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
import {AuthGuard} from "./frontend/auth/auth.guard";
import {BackAuthGuard} from "./frontend/auth/back-auth.guard";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, BackAuthGuard]
})
export class AppRoutingModule { }
