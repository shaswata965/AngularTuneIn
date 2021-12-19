import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminService} from "../../../frontend/service/admin.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public adminService : AdminService ) { }

  ngOnInit(): void {
  }

  createAdmin(form:NgForm){
      if(form.invalid){
        return
      }
    this.adminService.addAdmin(form.value.name, form.value.email, form.value.password);
    form.resetForm();
  }

}
