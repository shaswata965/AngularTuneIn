import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../service/language.service";
import { OwlOptions} from 'ngx-owl-carousel-o';
import {SongService} from "../../service/song.service";
import * as $ from 'jquery';
import {Song} from "../../models/song.model";
import {Language} from "../../models/language.model";
import {IndustryService} from "../../service/industry.service";
import {Industry} from "../../models/industry.model";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import {PageEvent} from "@angular/material/paginator";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../models/artist.model";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {AdService} from "../../service/ad.service";
import {Ad} from "../../models/ad.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  public songLanguages: any;
  public albumLanguages: any;
  public allLanguages: any;
  public allSongs: any;
  public bollywoodSongs: any;
  public allArtists: any;
  public itemArtists: any[];
  public topSongs: any;
  public allIndustries: any;
  public restSongs: any;
  public ads: any;
  public rightAd: any;
  public leftAd: any;
  public middleAd: Ad[]=[];
  albums: Album[] = [];
  totalSongs = 0;
  totalBollywoodSongs = 0;

  constructor(public languageService: LanguageService,
              private songService: SongService,
              public industryService: IndustryService,
              public albumService: AlbumService,
              public artistService: ArtistService,
              public userService: UserService,
              public adService: AdService) {}

  ngOnInit() {
    this.itemArtists = [];

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.languageService.getLanguages(1000,1);
    this.languageService.getLanguagesUpdateListener().subscribe((languageData:{languages: Language[], languageCount:number})=>{
      this.allLanguages = languageData.languages;
      let languageArray = [];
      let albumArray = [];
      if(this.allLanguages.length > 0){
        for(let i = 0; i < 4; i++){
          let x = this.allLanguages[i];
          languageArray.push(x);
          this.songLanguages = languageArray;
        }
      }else{
        this.songLanguages = this.allLanguages
      }

      if(this.allLanguages.length > 0){
        for(let i = 0; i < 3; i++){
          let x = this.allLanguages[i];
          albumArray.push(x);
          this.albumLanguages = albumArray;
        }
      }else{
        this.albumLanguages = this.allLanguages
      }
    });

    this.songService.getSongs(100, 1);
    this.songService.getSongsUpdateListener().subscribe((songData:{songs:Song[], songCount:number})=>{
      this.allSongs = songData.songs;

      let songArray = [];
      for(let i =0; i< 6; i++){
        let x = this.allSongs[i];
        songArray.push(x);
        this.topSongs = songArray;
      }
    });

    this.songService.getBollywoodSongs(9,1);
    this.songService.getBollywoodSongsUpdateListener().subscribe((songData:{songs:Song[], songCount:number})=>{
      this.bollywoodSongs = songData.songs;
      this.totalBollywoodSongs = songData.songCount;
    });


    this.industryService.getIndustries(1000, 1);
    this.industryService.getIndustriesUpdateListener().subscribe((industryData:{industries:Industry[], industryCount:number})=>{
      this.allIndustries = industryData.industries;
    });

    this.artistService.getFeaturedArtist(1000, 1);
    this.artistService.getFeaturedArtistsUpdateListener().subscribe((artistData:{artists:Artist[], artistCount:number})=>{
      this.allArtists = artistData.artists;
      for(let i=0; i<this.allArtists.length; i+=3){
        let artistArray = [];
        let x = this.allArtists[i];
        let x1 = this.allArtists[i+1];
        let x2 = this.allArtists[i+2];
        if(x && x1 && x2){
          artistArray.push(x,x1,x2);
          this.itemArtists.push(artistArray);
        }
        else if(x && x1){
          artistArray.push(x,x1);
          this.itemArtists.push(artistArray);
        }
        else{
          artistArray.push(x);
          this.itemArtists.push(artistArray);
        }
      }
    });

    this.albumService.getAlbums(8,1);
    this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums:Album[], albumCount:number})=>{
      this.albums = albumData.albums;
      this.totalSongs = albumData.albumCount;
    });

    this.adService.getAd(1000,1);
    this.adService.getAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      let middleArray = [];
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "right"){
          this.rightAd =this.ads[i];
        }else if(this.ads[i].position === "left"){
          this.leftAd = this.ads[i];
        }else if(this.ads[i].position === "middle"){
          middleArray.push(this.ads[i]);
          this.middleAd = middleArray;
        }
      }
    })

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

  customOptions: OwlOptions = {
    loop: !0,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 1200,
    navSpeed: 700,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: !0
      },
      600: {
        items: 3,
        nav: !0
      },
      1000: {
        items: 5,
        nav: !0,
        loop: !0,
        margin: 20
      }
    },
    nav: true
  }


  customOptions2: OwlOptions = {
    loop: !0,
    margin: 15,
    autoplay: true,
    smartSpeed: 3000,
    autoplayHoverPause: true,
    nav: true,
    navSpeed: 700,
    navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        loop: !0,
        nav: true,
        margin: 20
      }
    }
  }

  onChangedPage(pageEvent: PageEvent){
    this.albumService.getAlbums(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  onBollywoodChangedPage(pageEvent: PageEvent){
    this.songService.getBollywoodSongs(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
