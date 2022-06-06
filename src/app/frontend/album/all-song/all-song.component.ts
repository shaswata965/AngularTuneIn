import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song.service";
import {Song} from "../../models/song.model";
import {PageEvent} from "@angular/material/paginator";
import {LanguageService} from "../../service/language.service";
import {Language} from "../../models/language.model";

@Component({
  selector: 'app-all-song',
  templateUrl: './all-song.component.html',
  styleUrls: ['./all-song.component.css']
})
export class AllSongComponent implements OnInit {
  public songs: Song[] = [];

  public songLanguages: any;
  public allLanguages: any;
  public firstLanguage: any;

  totalSongs = 0;

  constructor(public songService: SongService, public languageService: LanguageService) { }

  ngOnInit() {
    this.songService.getSongs(12,1);
    this.songService.getSongsUpdateListener().subscribe((songData:{songs: Song[], songCount: number})=>{
      this.songs = songData.songs;
      this.totalSongs = songData.songCount;
    });

    this.languageService.getLanguages(1000,1);
    this.languageService.getLanguagesUpdateListener().subscribe((languageData:{languages: Language[], languageCount: number})=>{
      this.allLanguages = languageData.languages;
      this.firstLanguage = this.allLanguages[0];
      let languageArray = []
      if(this.allLanguages.length > 0){
        for(let i = 1; i < this.allLanguages.length; i++){
          let x = this.allLanguages[i];
          languageArray.push(x);
          this.songLanguages = languageArray;
        }
      }else{
        this.songLanguages = this.allLanguages
      }
    });

  }

  onChangedPage(pageEvent: PageEvent){
    this.songService.getSongs(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
