import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {mimeType} from "../../Admin/signup/mime-type.validator";
import {Ad} from "../../../frontend/models/ad.model";
import {AdService} from "../../../frontend/service/ad.service";

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {


  public mode = "Create";
  public ad: Ad;
  public adId: string | null ;

  imagePreview: string| ArrayBuffer | null;
  form: FormGroup;
  isLoading = false;

  constructor( public adService: AdService, public route: ActivatedRoute ) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]}),
      'page': new FormControl(null, {validators: [Validators.required]}),
      'position': new FormControl(null, {validators: [Validators.required]}),
      'link': new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('adId')){
        this.mode="Edit";
        this.isLoading = true;
        this.adId = paramMap.get('adId');
        this.adService.getEditAd(this.adId).subscribe(adData=>{
          this.ad = {id:adData._id, name:adData.name, imagePath: adData.imagePath, page: adData.page, position: adData.position, link: adData.link};
          this.form.setValue({
            'name': this.ad.name,
            'image': this.ad.imagePath,
            'page': this.ad.page,
            'position': this.ad.position,
            'link': this.ad.link
          });
          this.isLoading = false;
        });
      }else{
        this.mode = "Create";
        this.adId = null;
      }
    });

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

  createAd(){
    if(this.form.invalid){
      return
    }
    this.isLoading = true;
    if(this.mode==='Create'){
      this.adService.addAd(this.form.value.name, this.form.value.image, this.form.value.page, this.form.value.position, this.form.value.link);
    }
    else{
      this.adService.updateAd(this.adId, this.form.value.name, this.form.value.image, this.form.value.page, this.form.value.position, this.form.value.link );
    }
    this.form.reset();
  }


}
