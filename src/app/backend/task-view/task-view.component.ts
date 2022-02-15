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

  constructor(public taskService: TaskService) { }

  ngOnInit(){
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getTasksUpdateListener().subscribe((tasks: Task[])=>{
      this.tasks = tasks;
    });
  }

  CheckedFunction(taskId: string){
    this.taskService.deleteTask(taskId);
  }

}
