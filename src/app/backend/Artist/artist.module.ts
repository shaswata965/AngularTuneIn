import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {CreateArtistComponent} from "../../layouts/create-artist/create-artist.component";
import {ViewArtistComponent} from "../../layouts/view-artist/view-artist.component";
import {ArtistCreateComponent} from "./artist-create/artist-create.component";
import { ArtistViewComponent } from "./artist-view/artist-view.component";
import {ArtistListComponent} from "./artist-list/artist-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {StylePaginatorDirective} from "./artist-view/style-paginator.directive";

@NgModule({
  declarations: [
    ArtistCreateComponent,
    CreateArtistComponent,
    ArtistViewComponent,
    ViewArtistComponent,
    ArtistListComponent,
    StylePaginatorDirective,
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  entryComponents: [ArtistListComponent]
})

export class ArtistModule{}
