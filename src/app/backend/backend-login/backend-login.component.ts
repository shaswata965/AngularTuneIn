import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as $ from "jquery";
import {AdminService} from "../../frontend/service/admin.service";
import {Subscription} from "rxjs";
import {mimeType} from "../admin-signup/signup/mime-type.validator";

@Component({
  selector: 'app-backend-login',
  templateUrl: './backend-login.component.html',
  styleUrls: ['./backend-login.component.css']
})
export class BackendLoginComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  form: FormGroup;

  constructor(public adminService: AdminService) { }

  ngOnInit(){

    this.form = new FormGroup({
      'email': new FormControl(null,{validators:[Validators.required]}),
      'password': new FormControl(null,{validators:[Validators.required]})
    });

    this.userIsAuthenticated = this.adminService.getIsAuthenticated();
    this.authListenerSubs = this.adminService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  logIn(){
    if(this.form.invalid){
      return;
    }
    this.adminService.logIn(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
