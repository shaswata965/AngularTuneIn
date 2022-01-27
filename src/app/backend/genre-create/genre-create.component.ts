import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {GenreService} from "../../frontend/service/genre.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {

  public mode = "Create";

  public genreId: any | null ;
  public genre: any | null;
  imagePreview: string| ArrayBuffer | null;
  form: FormGroup;

  constructor( public genreService: GenreService, public route: ActivatedRoute ) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('genreId')){
        this.mode="Edit";
        this.genreId = paramMap.get('genreId');
        this.genreService.getEditGenre(this.genreId).subscribe(genreData=>{
          this.genre = {id:genreData._id, name:genreData.name, imagePath: genreData.imagePath};
          this.form.setValue({
            'name': this.genre.name,
            'image': this.genre.imagePath
          });
        });
      }else{
        this.mode = "Create";
        this.genreId = null;
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

  createGenre(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.genreService.addGenre(this.form.value.name, this.form.value.image);
    }
    else{
      this.genreService.updateGenre(this.genreId, this.form.value.name, this.form.value.image )
    }
    this.form.reset();
  }

}
