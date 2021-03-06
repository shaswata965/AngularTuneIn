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
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatPaginatorModule} from "@angular/material/paginator";
import {StylePaginatorDirective} from "../../backend/album/album-view/style-paginator.directive";
import { SearchResultComponent } from './search-result/search-result.component';
import {ToastrModule} from "ngx-toastr";
import {ClipboardModule} from "ngx-clipboard";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QuickLinksComponent,
    LandingComponent,
    ContactComponent,
    PlayerComponentComponent,
    StylePaginatorDirective,
    SearchResultComponent,
  ],
    exports: [
        FooterComponent,
        QuickLinksComponent,
        HeaderComponent,
        ContactComponent,
        SearchResultComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    CarouselModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    ClipboardModule
  ]
})

export class LandingModule {}
