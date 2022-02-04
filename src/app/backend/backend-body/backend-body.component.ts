import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../frontend/service/task.service";

@Component({
  selector: 'app-backend-body',
  templateUrl: './backend-body.component.html',
  styleUrls: ['./backend-body.component.css']
})
export class BackendBodyComponent implements OnInit {

  public currentDate: string | null;

  taskForm: FormGroup;

  constructor( public taskService: TaskService) { }

  ngOnInit(){
    this.taskForm = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      'name': new FormControl(null, {validators: [Validators.required]}),
      'task': new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(null)
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
