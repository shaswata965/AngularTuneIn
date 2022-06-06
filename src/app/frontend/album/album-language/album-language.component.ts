import { Component, OnInit } from '@angular/core';
import {Album} from "../../models/album.model";
import {AlbumService} from "../../service/album.service";
import {LanguageService} from "../../service/language.service";
import {Language} from "../../models/language.model";
import {PageEvent} from "@angular/material/paginator";
import {Song} from "../../models/song.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album-language',
  templateUrl: './album-language.component.html',
  styleUrls: ['./album-language.component.css']
})
export class AlbumLanguageComponent implements OnInit {

  public languageName: any;
  public languageId: any;
  public language: any;

  totalSongs = 0;
  public albums: Album[] = [];

  constructor(public albumsService: AlbumService, public languageService: LanguageService, public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap)=>{
      this.languageId = paramMap.get('languageId');
      this.languageService.getEditLanguage(this.languageId).subscribe(languageData=>{
        this.language = {id:languageData._id, name:languageData.name}
        this.languageName = this.language.name;
      });
      this.albumsService.getAlbumLanguage(this.languageId, 8,1);
      this.albumsService.getDataUpdateListener().subscribe((albumData:{albums:Album[], albumCount:number})=>{
        this.albums = albumData.albums;
        this.totalSongs = albumData.albumCount;
      });
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.albumsService.getAlbumLanguage(this.languageId,pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
