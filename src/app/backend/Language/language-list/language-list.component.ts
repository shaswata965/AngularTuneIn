import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LanguageService} from "../../../frontend/service/language.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  public languageDetails: any | null;
  private languagesSub: Subscription;
  public languageAlbum: any | null;
  public x: number | null;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<LanguageListComponent>, public languageService: LanguageService) { }

  ngOnInit(){
    this.isLoading = true;
    this.languagesSub = this.languageService.getLanguageAlbumUpdateListener().subscribe((album:any)=>{
      this.languageAlbum = album;
      this.x= this.languageAlbum.length;
      this.isLoading = false;
    });
    this.languageDetails = this.languageService.getModalLanguage();
  }

  onClose(){
    this.dialogRef.close();
  }

}
