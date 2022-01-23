import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeType} from "../admin-signup/signup/mime-type.validator";
import {ActorService} from "../../frontend/service/actor.service";
import {Actor} from "../../frontend/models/actor.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css']
})
export class ActorCreateComponent implements OnInit {

  public mode = "Create";

  public actorId: string | null;
  public actor: Actor;
  private infosSub: Subscription;
  public info: any | null;

  imagePreview: string| ArrayBuffer | null;
  imdb: string ='';
  form: FormGroup;

  constructor( public actorService : ActorService, public route : ActivatedRoute ) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null,{validators:[Validators.required]}),
      'awards': new FormControl(null,{validators:[Validators.required]}),
      'role': new FormControl(null,{validators:[Validators.required]}),
      'birth': new FormControl(null,{validators:[Validators.required]}),
      'death': new FormControl(null,{validators:[Validators.required]}),
      'image': new FormControl(null,{validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('actorId')){
        this.mode="Edit";
        this.actorId = paramMap.get('actorId');
        this.actorService.getEditActor(this.actorId).subscribe(actorData=>{
          this.actor = {id:actorData._id, name:actorData.name,  description:actorData.description, awards:actorData.awards, role:actorData.role, birth:actorData.birth, death: actorData.death, imagePath: actorData.imagePath};
          this.form.setValue({
            'name': this.actor.name,
            'description': this.actor.description,
            'awards': this.actor.awards,
            'role': this.actor.role,
            'birth': this.actor.birth,
            'death': this.actor.death,
            'image': this.actor.imagePath
          });
        });
      }else{
        this.mode = "Create";
        this.actorId = null;

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

  createActor(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.actorService.addActor(this.form.value.name, this.form.value.description, this.form.value.awards, this.form.value.role, this.form.value.birth, this.form.value.death, this.form.value.image);
    }
    else{
      this.actorService.updateActor(this.actorId,this.form.value.name, this.form.value.description, this.form.value.awards, this.form.value.role, this.form.value.birth, this.form.value.death, this.form.value.image )
    }
    this.form.reset();
  }

  linkDecipher(val:any){
    let firstArray = val.split("/");
    // this.actorService.searchForActor(firstArray[4]);
    // this.infosSub = this.actorService.getInfoUpdateListener().subscribe(response=>{
    //   this.info = {name: response.title, description: response.plot, cast: response.starList, year: response.year, release: response.releaseDate};
    //   let firstArray = [];
    //   let nameArray = [];
    //   let idArray = [];
    //   for (let p of response.starList){
    //     firstArray.push(p);
    //   }
    //
    //   for(let i = 0; i<firstArray.length; i++){
    //     let x = " "+firstArray[i].name;
    //     let y = " https://www.imdb.com/name/"+firstArray[i].id+"/";
    //     nameArray.push(x);
    //     idArray.push(y);
    //   }
    //   let cast = nameArray.toString();
    //   this.idString = idArray.toString();
    //   this.form.setValue({
    //     'name': this.info.name,
    //     'description': this.info.description,
    //     'composer': null,
    //     'cast': cast,
    //     'release': this.info.release,
    //     'year': this.info.year,
    //     'language': null,
    //     'image': null
    //   });
    // });
  }

  resetForm(){
    this.infosSub.unsubscribe();
    this.form.reset();
    window.location.reload();
  }

}
