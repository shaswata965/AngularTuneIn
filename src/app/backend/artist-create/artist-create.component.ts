import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtistService} from "../../frontend/service/artist.service";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../../frontend/models/artist.model";

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent implements OnInit {

  public mode = "Create";
  public artist: Artist;
  public artistId: string | null ;

  imagePreview: string| ArrayBuffer | null;
  form: FormGroup;

  constructor( public artistService: ArtistService, public route: ActivatedRoute ) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('artistId')){
        this.mode="Edit";
        this.artistId = paramMap.get('artistId');
        this.artistService.getEditArtist(this.artistId).subscribe(artistData=>{
          this.artist = {id:artistData._id, name:artistData.name, imagePath: artistData.imagePath};
          this.form.setValue({
            'name': this.artist.name,
            'image': this.artist.imagePath
          });
        });
      }else{
        this.mode = "Create";
        this.artistId = null;
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

  createArtist(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.artistService.addArtist(this.form.value.name, this.form.value.image);
    }
    else{
      this.artistService.updateArtist(this.artistId, this.form.value.name, this.form.value.image )
    }
    this.form.reset();
  }

}
