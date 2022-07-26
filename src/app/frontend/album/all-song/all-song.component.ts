import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song.service";
import {Song} from "../../models/song.model";
import {PageEvent} from "@angular/material/paginator";
import {LanguageService} from "../../service/language.service";
import {Language} from "../../models/language.model";
import * as $ from "jquery";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {ArtistService} from "../../service/artist.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-song',
  templateUrl: './all-song.component.html',
  styleUrls: ['./all-song.component.css']
})
export class AllSongComponent implements OnInit {

  userIsAuthenticated = false;

  // @ts-ignore
  private authListenerSubs: Subscription;

  public songs: Song[] = [];

  public songLanguages: any;
  public allLanguages: any;
  public firstLanguage: any;
  public ads: any;
  public leftAd: any;
  public rightAd: any;
  public currentRoute: any;

  totalSongs = 0;

  constructor(public songService: SongService,
              public languageService: LanguageService,
              public userService: UserService,
              public adService: AdService,
              public artistService: ArtistService,
              public router: Router,
              public toastr: ToastrService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

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

    this.adService.getPageAd("all-song",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "right"){
          this.rightAd =this.ads[i];
        }else if(this.ads[i].position === "left"){
          this.leftAd = this.ads[i];
        }
      }
    });

  }

  onChangedPage(pageEvent: PageEvent){
    this.songService.getSongs(pageEvent.pageSize, pageEvent.pageIndex+1);
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

  artistRouting(artist:string){
    this.artistService.getArtistId(artist).subscribe(artistData=>{
      this.router.navigate(['/artist-album',artistData._id]);
    });
  }

  Copy( album: string){
    this.currentRoute =window.location.protocol+"//"+ window.location.host + "/singles" + "/"+ album;
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
  }

}
