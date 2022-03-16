import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../frontend/service/task.service";

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent implements OnInit {

  public tasks: any;
  private tasksSub: Subscription;

  public reallocates: any;
  private reallocatesSub: Subscription;

  constructor(public taskService: TaskService) { }

  ngOnInit(){
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getAcceptedTask().subscribe((tasks: any)=>{
      this.tasks = tasks;
    });

    this.taskService.getReallocatedTasks();
    this.reallocatesSub = this.taskService.getReallocatedAcceptedTask().subscribe((tasks: any)=>{
      this.reallocates = tasks;
    });

  }
}
