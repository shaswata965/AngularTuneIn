import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LanguageService} from "../../frontend/service/language.service";
import {Language} from "../../frontend/models/language.model";

@Component({
  selector: 'app-language-create',
  templateUrl: './language-create.component.html',
  styleUrls: ['./language-create.component.css']
})
export class LanguageCreateComponent implements OnInit {


  public languageId : string | null;
  public mode = "Create";
  public language: Language;

  form: FormGroup;

  constructor(public route: ActivatedRoute, public languageService: LanguageService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('languageId')){
        this.mode="Edit";
        this.languageId = paramMap.get('languageId');
        this.languageService.getEditLanguage(this.languageId).subscribe(languageData=>{
          this.language = {id:languageData._id, name:languageData.name};
          console.log(this.language);
          this.form.setValue({
            'name': this.language.name,
          });
        });
      }else{
        this.mode = "Create";
        this.languageId = null;
      }
    });

  }

  createLanguage(){
    if(this.form.invalid){
      return
    }
    if(this.mode==='Create'){
      this.languageService.addLanguage(this.form.value.name);
    }else{
      this.languageService.updateLanguage(this.languageId,this.form.value.name)
    }
    this.form.reset();
  }

}
