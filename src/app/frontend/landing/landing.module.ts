import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {QuickLinksComponent} from "./quick-links/quick-links.component";
import {LandingComponent} from "../../layouts/landing/landing.component";
import {ContactComponent} from "./contact/contact.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {PlayerComponentComponent} from "./player-component/player-component.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QuickLinksComponent,
    LandingComponent,
    ContactComponent,
    PlayerComponentComponent,
  ],
  exports: [
    FooterComponent,
    QuickLinksComponent,
    HeaderComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    SwiperModule
  ]
})

export class LandingModule {}
