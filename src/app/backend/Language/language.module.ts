import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {CreateLanguageComponent} from "../../layouts/create-language/create-language.component";
import {ViewLanguageComponent} from "../../layouts/view-language/view-language.component";
import {LanguageCreateComponent} from "./language-create/language-create.component";
import {LanguageViewComponent} from "./language-view/language-view.component";
import {LanguageListComponent} from "./language-list/language-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    LanguageCreateComponent,
    LanguageViewComponent,
    CreateLanguageComponent,
    ViewLanguageComponent,
    LanguageListComponent
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
    MatProgressSpinnerModule
  ],
  entryComponents: [LanguageListComponent]
})

export class LanguageModule{}
