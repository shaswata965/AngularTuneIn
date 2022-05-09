import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../frontend/service/task.service";
import {AdminService} from "../../../frontend/service/admin.service";
import {Subscription} from "rxjs";
import {Admin} from "../../../frontend/models/admin.model";
import {EventService} from "../../../frontend/service/event.service";
import {UserService} from "../../../frontend/service/user.service";
import {SongService} from "../../../frontend/service/song.service";
import {AlbumService} from "../../../frontend/service/album.service";
import {ContactService} from "../../../frontend/service/contact.service";
import * as $ from 'jquery';
import {Router} from "@angular/router";
import { ChartOptions, ChartType, ChartDataSets, ScaleType } from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-backend-body',
  templateUrl: './backend-body.component.html',
  styleUrls: ['./backend-body.component.css']
})
export class BackendBodyComponent implements OnInit {

  public currentDate: string | null;
  public admins: any;
  public adminsSub: Subscription;
  isLoading = false;
  public users: any;
  public songs: any;
  public albums: any;
  public contacts: any;

  public events: any | null;
  private eventDetailsSub: Subscription;

  taskForm: FormGroup;

  constructor( public taskService: TaskService,
               public adminService: AdminService,
               public eventService: EventService,
               public userService: UserService,
               public songService: SongService,
               public albumService: AlbumService,
               public contactService: ContactService,
               private router: Router
               ) { }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false,
        display: true,
        // @ts-ignore
        barThickness: 15,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], label: 'Revenue' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#64C5B1' }
  ];

  public orderChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: false,
        display: true,
        // @ts-ignore
        barThickness: 5,
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines:{
          display: false
        }
      }],
      yAxes: [{
        gridLines:{
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  };
  public orderChartLabels: Label[] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  public orderChartType: ChartType = 'bar';
  public orderChartLegend = false;
  public orderChartPlugins = [];

  public orderChartData: ChartDataSets[] = [
    { data: [100, 120, 180, 356, 170, 110, 90], label: 'Revenue' }
  ];

  public orderChartColors: Color[] = [
    { backgroundColor: '#64C5B1' }
  ];

  ngOnInit(){
    this.taskForm = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      'name': new FormControl(null, {validators: [Validators.required]}),
      'task': new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(null)
    });

    this.isLoading =true;
    this.adminService.getAdmins();
    this.adminsSub = this.adminService.getAdminsUpdateListener().subscribe((admin: Admin[])=>{
      this.admins = admin;
    });

    this.eventService.getEvents();
    this.eventDetailsSub = this.eventService.getEventsUpdateListener().subscribe((event:any)=>{
      this.events= event;
      this.isLoading =false;
    });

    this.userService.getUsers();
    this.userService.getUsersUpdateListener().subscribe((user:any)=>{
      this.users = user.length;
    });

    this.songService.getSongs();
    this.songService.getSongsUpdateListener().subscribe((song:any)=>{
      this.songs = song.length;
    });

    this.albumService.getAlbums();
    this.albumService.getAlbumsUpdateListener().subscribe((album:any)=>{
      this.albums = album.length;
    });

    this.contactService.getContacts();
    this.contactService.getContactsUpdateListener().subscribe((contact:any)=>{
      this.contacts = contact.length;
    });

    let ctx = document.getElementById("page_view");
    // @ts-ignore
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{ backgroundColor: ["#E4E9EC", "#E4E9EC", "#E4E9EC"," #64C5B1", "#E4E9EC", "#E4E9EC", "#E4E9EC"], data: [15, 20, 25, 30, 25, 20, 15] }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: { display: !1 },
        tooltips: { intersect: !1, mode: "nearest" },
        legend: { display: !1 },
        barRadius: 2,
        scales: { xAxes: [{ barThickness: 5, display: !1, gridLines: !1, ticks: { beginAtZero: !0 } }], yAxes: [{ display: !1, gridLines: !1, ticks: { beginAtZero: !0 } }] },
        layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
      },
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
    let m: string | number = date.getMonth() +1;
    m = m.toString();
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

  calendarClicked(){
    this.router.navigate(['/view-calendar']);
  }

}
