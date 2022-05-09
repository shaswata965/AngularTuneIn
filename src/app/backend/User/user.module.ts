import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {GeneralUserListComponent} from "../../layouts/general-user-list/general-user-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {GeneralUserViewComponent} from "./general-user-view/general-user-view.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../frontend/interceptor/auth-interceptor";
import {BackAuthInterceptor} from "../../frontend/interceptor/back-auth-interceptor";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from "angularx-social-login";

@NgModule({
  declarations: [
    UserListComponent,
    GeneralUserListComponent,
    GeneralUserViewComponent
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    BrowserModule,
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
  entryComponents: [GeneralUserViewComponent]
})

export class UserModule{}
