import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public songLanguages: any;
  public allLanguages: any;
  public firstSongLanguage: any;


  constructor(public languageService: LanguageService) {  }

  ngOnInit() {

    this.languageService.getLanguages();
    this.languageService.getLanguagesUpdateListener().subscribe((language: any)=>{
      this.allLanguages = language;
      this.firstSongLanguage = this.allLanguages[0];
      let languageArray = []
      if(this.allLanguages.length > 0){
        for(let i = 1; i < 5; i++){
          let x = this.allLanguages[i];
          languageArray.push(x);
          this.songLanguages = languageArray;
        }
      }else{
        this.songLanguages = this.allLanguages
      }
    });

  }



}
