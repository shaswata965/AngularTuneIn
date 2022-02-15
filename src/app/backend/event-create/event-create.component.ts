import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../frontend/service/event.service";
import {AdminService} from "../../frontend/service/admin.service";
import {Subscription} from "rxjs";
import {Admin} from "../../frontend/models/admin.model";
import {ActivatedRoute} from "@angular/router";
import {Event} from "../../frontend/models/event.model";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  public mode = "Create";
  public adminsSub: Subscription;
  public admins: Admin[];
  public eventDate: any;
  public eventMonth: any;
  public currentTime: any;
  public currentAdmin: any;
  public eventId: any | null;
  public event: any | null;

  form: FormGroup;

  constructor( public eventService: EventService,public adminService: AdminService, public route: ActivatedRoute) { }

  ngOnInit(){

    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null,{validators:[Validators.required]}),
      'admin': new FormControl(null,{validators:[Validators.required]}),
      'date': new FormControl(null,{validators:[Validators.required]})
    });

    this.adminService.getAdmins();
    this.adminsSub = this.adminService.getAdminsUpdateListener().subscribe((admin: Admin[])=>{
      this.admins = admin;
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('eventId')){
        this.mode="Edit";
        this.eventId = paramMap.get('eventId');
        this.eventService.getEditEvent(this.eventId).subscribe(eventData=>{
          this.event = {id:eventData._id, title:eventData.title,  description:eventData.description, admin:eventData.admin};
          this.form.setValue({
            'title': this.event.title,
            'description': this.event.description,
            'admin': this.event.admin,
            'date': null,
          });
        });
      }else{
        this.mode = "Create";
        this.eventId = null;

      }
    });

  }

  createEvent(){
    if(this.form.invalid){
      return
    }

    let firstDate  = (this.form.value.date).toString();
    let dateArray = [];
    dateArray= firstDate.split(" ");
    this.eventDate = dateArray[2];
    this.eventMonth = dateArray[1];

    let date = new Date();
    let h = date.getHours();
    let m: string | number = date.getMinutes();
    let ampm = h >= 12 ? 'pm' : 'am';
    let hour = h % 12;
    hour = hour ? hour : 12;
    m = m < 10 ? '0' + m : m;

    this.currentTime = hour + ':' + m + " " + ampm;

    this.currentAdmin = localStorage.getItem('currentAdmin');

    if(this.mode==='Create'){
      this.eventService.addEvent(this.form.value.title, this.form.value.description, this.form.value.admin, this.eventDate, this.eventMonth, this.currentTime, this.currentAdmin);
    }else{
      this.eventService.updateEvent(this.eventId,this.form.value.title, this.form.value.description, this.form.value.admin, this.eventDate, this.eventMonth, this.currentTime, this.currentAdmin);
    }
    this.form.reset();
  }


}
