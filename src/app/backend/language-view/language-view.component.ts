import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Language} from "../../frontend/models/language.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LanguageService} from "../../frontend/service/language.service";
import {LanguageListComponent} from "../language-list/language-list.component";

@Component({
  selector: 'app-language-view',
  templateUrl: './language-view.component.html',
  styleUrls: ['./language-view.component.css']
})
export class LanguageViewComponent implements OnInit , OnDestroy{

  languages: Language[] =[];
  private languagesSub: Subscription;
  public modalLanguage : any | null;

  constructor(public languageService: LanguageService,
              private Dialog: MatDialog) { }

  ngOnInit(){
    this.languageService.getLanguages();
    this.languagesSub = this.languageService.getLanguagesUpdateListener().subscribe((languages: Language[])=>{
      this.languages = languages;
      console.log(this.languages);
    });
  }

  ngOnDestroy() {
    this.languagesSub.unsubscribe();
  }

  onDelete(languageId: string){
    this.languageService.deleteLanguage(languageId);
  }

  openViewModal(language : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    this.Dialog.open(LanguageListComponent, dialogConfig);
    this.languageService.addModalLanguage(language);
  }

}
