import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../frontend/service/task.service";

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {
   public tasks: any;
  private tasksSub: Subscription;

  public reallocates: any;
  private reallocatesSub: Subscription;

  constructor(public taskService: TaskService) { }

  ngOnInit(){
    this.taskService.getTasks();
    this.tasksSub = this.taskService.getCompletedTask().subscribe((tasks: any)=>{
      this.tasks = tasks;
    });

    this.taskService.getReallocatedTasks();
    this.reallocatesSub = this.taskService.getReallocatedCompletedTask().subscribe((tasks: any)=>{
      this.reallocates = tasks;
    });

  }

  acceptTask(taskId:any){
    let currentAdmin = localStorage.getItem('currentAdmin');
    this.taskService.acceptTask(taskId,currentAdmin);

  }

}
