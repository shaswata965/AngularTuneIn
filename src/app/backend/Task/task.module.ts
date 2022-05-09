import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BlandingModule} from "../backend-landing/blanding.module";
import {ViewTaskComponent} from "../../layouts/view-task/view-task.component";
import {TaskViewComponent} from "./task-view/task-view.component";
import {HistoryTaskComponent} from "../../layouts/history-task/history-task.component";
import {CompletedTaskComponent} from "../../layouts/completed-task/completed-task.component";
import {ReallocationTaskComponent} from "../../layouts/reallocation-task/reallocation-task.component";
import {TaskHistoryComponent} from "./task-history/task-history.component";
import {TaskCompletedComponent} from "./task-completed/task-completed.component";
import {TaskReallocationComponent} from "./task-reallocation/task-reallocation.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    TaskViewComponent,
    ViewTaskComponent,
    TaskHistoryComponent,
    HistoryTaskComponent,
    TaskCompletedComponent,
    CompletedTaskComponent,
    TaskReallocationComponent,
    ReallocationTaskComponent,
  ],
  imports: [
    RouterModule,
    BlandingModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class TaskModule{}
