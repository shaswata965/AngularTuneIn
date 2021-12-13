import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import{NgForm} from "@angular/forms";
import{UserService} from "../service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  public subMenuOne = true;
  public subMenuTwo =true;

  constructor(public userService: UserService) { }

  createUser(form:NgForm){
    if(form.invalid){
      return;
    }
    this.userService.addUser(form.value.name, form.value.email, form.value.password);
    form.resetForm();
    $('#register_modal_closer').click();
  }


  logInUser(form:NgForm){
    if(form.invalid){
      return;
    }
    this.userService.logIn(form.value.email, form.value.password);
    form.resetForm();
    $('#login_modal_closer').click();
  }

  ngOnInit(){
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onLogOut(){
    this.userService.logOut();
  }

  menuOpener(){
    $("#toggle").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }

  menuCloser(){
    $("#toggle_close").on("click", function() {
      // @ts-ignore
      $("#sidebar").width(), 0 == $("#sidebar").offset().left ? $("#sidebar").animate({
        left: -500
      }, "slow") : $("#sidebar").animate({
        left: "0"
      }, "slow")
    })
  }

}
