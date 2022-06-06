import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../../../frontend/service/language.service";
import {IndustryService} from "../../../frontend/service/industry.service";

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {

  public industryDetails: any | null;
  private industriesSub: Subscription;
  public industryAlbum: any | null;
  public x: number | null;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<IndustryListComponent>, public industryService: IndustryService) { }

  ngOnInit(){
    this.isLoading = true;
    this.industriesSub = this.industryService.getIndustryAlbumUpdateListener().subscribe((album:any)=>{
      this.industryAlbum = album;
      this.x= this.industryAlbum.length;
      this.isLoading = false;
    });
    this.industryDetails = this.industryService.getModalIndustry();
  }

  onClose(){
    this.dialogRef.close();
  }

}
