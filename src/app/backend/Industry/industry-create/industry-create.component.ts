import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Industry} from "../../../frontend/models/industry.model";
import {ActivatedRoute} from "@angular/router";
import {IndustryService} from "../../../frontend/service/industry.service";

@Component({
  selector: 'app-industry-create',
  templateUrl: './industry-create.component.html',
  styleUrls: ['./industry-create.component.css']
})
export class IndustryCreateComponent implements OnInit {

  public industryId : string | null;
  public mode = "Create";
  public industry: Industry;

  form: FormGroup;
  isLoading = false;

  constructor(public route: ActivatedRoute, public industryService: IndustryService) { }

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('industryId')){
        this.mode="Edit";
        this.isLoading = true;
        this.industryId = paramMap.get('industryId');
        this.industryService.getEditIndustry(this.industryId).subscribe(industryData=>{
          this.industry = {id:industryData._id, name:industryData.name};
          console.log(this.industry);
          this.form.setValue({
            'name': this.industry.name,
          });
          this.isLoading = false;
        });
      }else{
        this.mode = "Create";
        this.industryId = null;
      }
    });

  }

  createIndustry(){
    if(this.form.invalid){
      return
    }
    this.isLoading = true;
    if(this.mode==='Create'){
      this.industryService.addIndustry(this.form.value.name);
    }else{
      this.industryService.updateIndustry(this.industryId,this.form.value.name)
    }
    this.form.reset();
  }

}
