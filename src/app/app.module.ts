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
import {MAT_DATE_LOCALE, MatOptionModule} from "@angular/material/core";
import { MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { BackendLoginComponent } from './backend/backend-landing/backend-login/backend-login.component';
import {AuthInterceptor} from "./frontend/interceptor/auth-interceptor";
import {BackAuthInterceptor} from "./frontend/interceptor/back-auth-interceptor";
import {AlbumModule} from "./frontend/album/album.module";
import {LandingModule} from "./frontend/landing/landing.module";
import {ProfileModule} from "./frontend/profile/profile.module";
import {BlandingModule} from "./backend/backend-landing/blanding.module";
import {ActorModule} from "./backend/actor/actor.module";
import {AdModule} from "./backend/ad/ad.module";
import {AdminModule} from "./backend/Admin/admin.module";
import {BackendAlbumModule} from "./backend/album/backend-album.module";
import {ContactModule} from "./backend/Contact/contact.module";
import {GenreModule} from "./backend/Genre/genre.module";
import {LanguageModule} from "./backend/Language/language.module";
import {SongModule} from "./backend/Song/song.module";
import {TaskModule} from "./backend/Task/task.module";
import {EventModule} from "./backend/Event/event.module";
import { UserModule} from "./backend/User/user.module";
import {ArtistModule} from "./backend/Artist/artist.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    BackendLoginComponent,
  ],
  imports: [
    AlbumModule,
    LandingModule,
    ProfileModule,
    BlandingModule,
    ActorModule,
    AdModule,
    AdminModule,
    BackendAlbumModule,
    ContactModule,
    GenreModule,
    LanguageModule,
    SongModule,
    TaskModule,
    EventModule,
    UserModule,
    ArtistModule,
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
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
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
  entryComponents: []
})
export class AppModule { }
