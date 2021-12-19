import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import * as $ from "jquery";
import {AdminService} from "../../frontend/service/admin.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-backend-login',
  templateUrl: './backend-login.component.html',
  styleUrls: ['./backend-login.component.css']
})
export class BackendLoginComponent implements OnInit, OnDestroy {
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

  logIn(form:NgForm){
    if(form.invalid){
      return;
    }
    this.adminService.logIn(form.value.email, form.value.password);
    form.resetForm();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
