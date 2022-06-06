import {NgModule} from "@angular/core";
import {BackendHomeComponent} from "../../layouts/backend-home/backend-home.component";
import {BackendHeaderComponent} from "./backend-header/backend-header.component";
import {BackendBodyComponent} from "./backend-body/backend-body.component";
import {BackendFooterComponent} from "./backend-footer/backend-footer.component";
import {BackendDashboardComponent} from "./backend-dashboard/backend-dashboard.component";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "../../app.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ChartsModule} from "ng2-charts";
import {StylePaginatorDirective} from "../Song/song-view/style-paginator.directive";

@NgModule({
    declarations: [
        BackendHomeComponent,
        BackendHeaderComponent,
        BackendBodyComponent,
        BackendFooterComponent,
        BackendDashboardComponent,
        StylePaginatorDirective,
    ],
    exports: [
        BackendFooterComponent,
        BackendDashboardComponent,
        BackendHeaderComponent,
        StylePaginatorDirective
    ],
    imports: [
        RouterModule,
        NgbModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        CommonModule,
        BrowserModule,
        MatProgressBarModule,
        MatDatepickerModule,
        ChartsModule
    ]
})

export class BlandingModule{}
