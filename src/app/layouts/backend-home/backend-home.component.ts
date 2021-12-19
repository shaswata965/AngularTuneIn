import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../frontend/service/admin.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-backend-home',
  templateUrl: './backend-home.component.html',
  styleUrls: ['./backend-home.component.css']
})
export class BackendHomeComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  constructor(public adminService: AdminService) { }

  ngOnInit(){
    this.userIsAuthenticated = this.adminService.getIsAuthenticated();
    this.authListenerSubs = this.adminService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
