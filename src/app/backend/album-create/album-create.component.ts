import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../frontend/service/album.service";

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  public albumId : string | null;
  public mode = "Create";

  form: FormGroup;
  imagePreview: string | ArrayBuffer | null;

  constructor(public route: ActivatedRoute, public albumService:AlbumService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null,{validators:[Validators.required]}),
      'composer': new FormControl(null,{validators:[Validators.required]}),
      'lyricist': new FormControl(null,{validators:[Validators.required]}),
      'release': new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });
    // this.route.paramMap.subscribe((paramMap)=>{
    //   if(paramMap.has('albumId')){
    //     this.mode="Edit";
    //     this.albumId = paramMap.get('albumId');
    //     this.albumService.getEditAlbum(this.adminId).subscribe(adminData=>{
    //       this.admin = {id:adminData._id, name:adminData.name,  address:adminData.address, email:adminData.email, password:adminData.password, imagePath: adminData.imagePath};
    //       console.log(this.admin);
    //       this.form.setValue({
    //         'name': this.admin.name,
    //         'address': this.admin.address,
    //         'email': this.admin.email,
    //         'image': this.admin.imagePath,
    //         'password': null
    //       });
    //     });
    //   }else{
    //     this.mode = "Create";
    //     this.albumId = null;
    //   }
    // });
  }

  createAlbum(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.albumService.addAlbum(this.form.value.name, this.form.value.description, this.form.value.composer, this.form.value.lyricist, this.form.value.release, this.form.value.image);
    }else{
      this.albumService.updateAlbum(this.albumId,this.form.value.name, this.form.value.description, this.form.value.composer, this.form.value.lyricist, this.form.value.release, this.form.value.image )
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
