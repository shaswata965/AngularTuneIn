import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminService} from "../../../frontend/service/admin.service";
import {ActivatedRoute} from "@angular/router";
import {Admin} from "../../../frontend/models/admin.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public notificationBell = true;
  public sidebarMenu = false;
  public adminMenu = true;
  private mode = "create";
  private adminId: string | null;
  public admin: Admin;

  constructor(public adminService : AdminService, public route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('adminId')){
        this.mode="edit";
        this.adminId = paramMap.get('adminId');
        // @ts-ignore
        this.admin = this.adminService.getEditAdmin(this.adminId).subscribe(adminData=>{
          this.admin = {id:adminData._id, name:adminData.name,  address:adminData.address, email:adminData.email, password:adminData.password};
        });
      }else{
        this.mode = "create";
        this.adminId = null;
      }
    });
  }

  createAdmin(form:NgForm){
      if(form.invalid){
        return
      }

      if(this.mode==='create'){
        this.adminService.addAdmin(form.value.name, form.value.address, form.value.email, form.value.password);
      }else{
       this.adminService.updateAdmin(this.adminId,form.value.name, form.value.address, form.value.email, form.value.password )
      }
    form.resetForm();
  }
}
