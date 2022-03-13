import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../frontend/service/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-reallocation',
  templateUrl: './task-reallocation.component.html',
  styleUrls: ['./task-reallocation.component.css']
})
export class TaskReallocationComponent implements OnInit {

  public tasks: any;
  private tasksSub: Subscription;
  public taskId: any;

  constructor(public taskService: TaskService, public route: ActivatedRoute) { }

  ngOnInit(){

    this.route.paramMap.subscribe((paramMap)=>{

      this.taskId = paramMap.get('taskId');

      this.taskService.getTasks();
      this.tasksSub = this.taskService.getReallocationTask(this.taskId).subscribe((tasks: any)=>{
        this.tasks = tasks;
      });
    });

  }

  acceptTask(taskId:any){
    let currentAdmin = localStorage.getItem('currentAdmin');
    this.taskService.acceptTask(taskId,currentAdmin);

  }

}
