import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../frontend/service/admin.service";
import {ActivatedRoute} from "@angular/router";
import {Admin} from "../../../frontend/models/admin.model";
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public sidebarMenu = false;
  public adminMenu = true;
  public mode = "Create";
  private adminId: string | null;
  public admin: Admin;

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;
  isLoading = false;

  constructor(public adminService : AdminService, public route: ActivatedRoute ) { }

  ngOnInit() {

    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'address': new FormControl(null,{validators:[Validators.required]}),
      'email': new FormControl(null,{validators:[Validators.required]}),
      'password': new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('adminId')){
        this.mode="Edit";
        this.isLoading = true;
        this.adminId = paramMap.get('adminId');
        this.adminService.getEditAdmin(this.adminId).subscribe(adminData=>{
          this.admin = {id:adminData._id, name:adminData.name,  address:adminData.address, email:adminData.email, password:adminData.password, imagePath: adminData.imagePath};
          console.log(this.admin);
          this.form.setValue({
            'name': this.admin.name,
            'address': this.admin.address,
            'email': this.admin.email,
            'image': this.admin.imagePath,
            'password': null
          });
          this.isLoading = false;
        });
      }else{
        this.mode = "Create";
        this.adminId = null;
      }
    });
  }

  createAdmin(){
      if(this.form.invalid){
        return
      }
      this.isLoading = true;
      if(this.mode==='Create'){
        this.adminService.addAdmin(this.form.value.name, this.form.value.address, this.form.value.email, this.form.value.password, this.form.value.image);
      }else{
       this.adminService.updateAdmin(this.adminId,this.form.value.name, this.form.value.address, this.form.value.email, this.form.value.password, this.form.value.image )
      }
    this.form.reset();
  }

  onImagePicked(event: Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
