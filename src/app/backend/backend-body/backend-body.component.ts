import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../frontend/service/task.service";
import {AdminService} from "../../frontend/service/admin.service";
import {Subject, Subscription} from "rxjs";
import {Admin} from "../../frontend/models/admin.model";
import {EventService} from "../../frontend/service/event.service";

@Component({
  selector: 'app-backend-body',
  templateUrl: './backend-body.component.html',
  styleUrls: ['./backend-body.component.css']
})
export class BackendBodyComponent implements OnInit {

  public currentDate: string | null;
  public admins: any;
  public adminsSub: Subscription;

  public events: any | null;
  private eventDetailsSub: Subscription;

  taskForm: FormGroup;

  constructor( public taskService: TaskService, public adminService: AdminService, public eventService: EventService) { }

  ngOnInit(){
    this.taskForm = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      'name': new FormControl(null, {validators: [Validators.required]}),
      'task': new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(null)
    });

    this.adminService.getAdmins();
    this.adminsSub = this.adminService.getAdminsUpdateListener().subscribe((admin: Admin[])=>{
      this.admins = admin;
    });

    this.eventService.getEvents();
    this.eventDetailsSub = this.eventService.getEventsUpdateListener().subscribe((event:any)=>{
      this.events= event;
    });
  }

  createTask(){
    let date = new Date();
    let d = date.getDate().toString();
    let dLength = d.length;
    let dd ='';
    let mm ='';
    if(dLength === 1){
      dd = '0' + d;
    }else{
      dd = d;
    }
    let m = date.getMonth().toString();
    let mLength = m.length;
    if(mLength === 1){
      mm = '0' + m;
    }else{
      mm = m;
    }
    let yy = date.getFullYear().toString();
    this.currentDate = dd+ '-' + mm + '-' + yy;

    this.taskForm.value.date = this.currentDate;

    if(this.taskForm.invalid){
      return
    }
      this.taskService.addTask(this.taskForm.value.title,this.taskForm.value.name,this.taskForm.value.task, this.currentDate);
      this.taskForm.reset();
  }

}
