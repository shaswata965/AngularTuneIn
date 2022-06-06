import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {AlbumService} from "../../service/album.service";
import {Language} from "../../models/language.model";
import {LanguageService} from "../../service/language.service";
import {Album} from "../../models/album.model";
import {Song} from "../../models/song.model";

@Component({
  selector: 'app-all-album',
  templateUrl: './all-album.component.html',
  styleUrls: ['./all-album.component.css']
})
export class AllAlbumComponent implements OnInit {

  public songLanguages: any;
  public allLanguages: any;
  public firstLanguage: any;

  totalSongs = 0;
  public albums: Album[] = [];

  constructor(public albumsService: AlbumService, public languageService: LanguageService) { }

  ngOnInit(){

    this.albumsService.getAlbums(12,1);
    this.albumsService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.albums = albumData.albums;
      this.totalSongs = albumData.albumCount;
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
    this.albumsService.getAlbums(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
