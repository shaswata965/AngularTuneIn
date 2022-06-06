import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LanguageService} from "../../service/language.service";
import {SongService} from "../../service/song.service";
import {PageEvent} from "@angular/material/paginator";
import {Song} from "../../models/song.model";
import * as $ from "jquery";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  public languageName: any;
  public languageId: any;
  public language: any;

  public songs: any;

  totalSongs = 0;

  constructor(public route: ActivatedRoute, public languageService: LanguageService, public songService: SongService) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap)=>{
      this.languageId = paramMap.get('languageId');
      this.languageService.getEditLanguage(this.languageId).subscribe(languageData=>{
        this.language = {id:languageData._id, name:languageData.name}
        this.languageName = this.language.name;
      });
      this.songService.getSongLanguage(this.languageId, 8,1);
      this.songService.getDataUpdateListener().subscribe((songData:{songs:Song[], songCount:number})=>{
        this.songs = songData.songs;
        this.totalSongs = songData.songCount;
      });
    });
  }

  OpenTrending(){

    $(".m24_tranding_more_icon").on("click", function(e) {
      if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
      else t = $(this).parent();
      t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
    }), $(document).on("click", function(e) {
      $("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option")
    })

  }

  onChangedPage(pageEvent: PageEvent){
    this.songService.getSongLanguage(this.languageId, pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
