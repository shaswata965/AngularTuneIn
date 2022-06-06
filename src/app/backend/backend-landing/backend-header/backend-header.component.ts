import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../frontend/service/admin.service";
import {TaskService} from "../../../frontend/service/task.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.css']
})
export class BackendHeaderComponent implements OnInit {

  public notificationBell = true;
  public sidebarMenu = false;
  public adminMenu = true;
  public userMenu = true;
  public albumMenu = true;
  public languageMenu = true;
  public actorMenu = true;
  public artistMenu = true;
  public genreMenu = true;
  public songMenu = true;
  public taskMenu = true;
  public eventMenu = true;
  public calendarMenu = true;
  public contactMenu = true;
  public adMenu = true;
  public industryMenu = true;
  isLoading = false;

  public currentAdminName : string | null;
  public currentAdminImage : string | null;
  public tasks : any;
  public tasksSub: Subscription;

  constructor(public adminService: AdminService, public tasksService: TaskService ) {}

  onLogOut(){
    this.adminService.logOut();
  }

  ngOnInit() {

    this.currentAdminName = this.adminService.getThisAdmin().currentAdmin;
    this.currentAdminImage = this.adminService.getThisAdmin().currentAdminImage;
    this.isLoading = true;
    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTasksUpdateListener().subscribe((tasks:any)=>{
      this.tasks = tasks;
      this.isLoading = false;
    });
  }


}
