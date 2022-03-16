import { Component, OnInit } from '@angular/core';
import {Task} from "../../frontend/models/task.model";
import {TaskService} from "../../frontend/service/task.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  tasks: any;
  private tasksSub: Subscription;

  reallocates: any;
  private reallocatesSub: Subscription;

  constructor(public taskService: TaskService) { }

  ngOnInit(){
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getTasksUpdateListener().subscribe((tasks: Task[])=>{
      this.tasks = tasks;
    });

    this.taskService.getReallocatedTasks();
    this.reallocatesSub = this.taskService.getReallocatedTasksUpdateListener().subscribe((tasks: Task[])=>{
      this.reallocates = tasks;
    });
  }

  CheckedFunction(taskId: string){
    this.taskService.markTask(taskId);
  }

}
