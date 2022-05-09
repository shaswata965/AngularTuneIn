import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../../frontend/service/task.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Admin} from "../../../frontend/models/admin.model";
import {AdminService} from "../../../frontend/service/admin.service";

@Component({
  selector: 'app-task-reallocation',
  templateUrl: './task-reallocation.component.html',
  styleUrls: ['./task-reallocation.component.css']
})
export class TaskReallocationComponent implements OnInit {

  public tasks: any;
  private tasksSub: Subscription;
  public taskId: any;

  public adminsSub: Subscription;
  public admins: any;

  form: FormGroup;

  constructor(public taskService: TaskService, public route: ActivatedRoute, public adminService: AdminService) { }

  ngOnInit(){

    this.form = new FormGroup({
      'update': new FormControl(null, {validators: [Validators.required]}),
      'name': new FormControl(null,{validators:[Validators.required]}),
    });

    this.adminService.getAdmins();
    this.adminsSub = this.adminService.getAdminsUpdateListener().subscribe((admin: Admin[])=>{
      this.admins = admin;
    });

    this.route.paramMap.subscribe((paramMap)=>{

      this.taskId = paramMap.get('taskId');

      this.taskService.getTasks();
      this.tasksSub = this.taskService.getReallocationTask(this.taskId).subscribe((tasks: any)=>{
        console.log(tasks);
        this.tasks = tasks;
      });
    });

  }

  reallocateTask(){
    if(this.form.invalid){
      return
    }
    this.taskService.reallocateTask( this.form.value.name, this.form.value.update, this.taskId, this.tasks.acceptAdmin, this.tasks.accepted, this.tasks.admin, this.tasks.adminImagePath, this.tasks.completed, this.tasks.date, this.tasks.name, this.tasks.task, this.tasks.title);
    this.form.reset();
  }

}
