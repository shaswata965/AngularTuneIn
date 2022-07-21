import { Component, OnInit } from '@angular/core';
import {Album} from "../../models/album.model";
import {AlbumService} from "../../service/album.service";
import {LanguageService} from "../../service/language.service";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import * as $ from "jquery";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {ArtistService} from "../../service/artist.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-album-language',
  templateUrl: './album-language.component.html',
  styleUrls: ['./album-language.component.css']
})
export class AlbumLanguageComponent implements OnInit {

  userIsAuthenticated = false;

  // @ts-ignore
  private authListenerSubs: Subscription;

  public languageName: any;
  public languageId: any;
  public language: any;
  public ads: any;
  public leftAd: any;
  public rightAd: any;
  public middleAd: any;
  public currentRoute: string;

  totalSongs = 0;
  public albums: Album[] = [];

  constructor(public albumsService: AlbumService,
              public languageService: LanguageService,
              public route: ActivatedRoute,
              public userService: UserService,
              public adService: AdService,
              public artistService: ArtistService,
              public router: Router,
              public toastr: ToastrService) { }

  ngOnInit(){

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

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

    this.adService.getPageAd("all-album",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "right"){
          this.rightAd =this.ads[i];
        }else if(this.ads[i].position === "left"){
          this.leftAd = this.ads[i];
        }else if(this.ads[i].position === "middle"){
          this.middleAd = this.ads[i];
        }
      }
    });

  }

  onChangedPage(pageEvent: PageEvent){
    this.albumsService.getAlbumLanguage(this.languageId,pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  OpenTrending() {
    $(".m24_tranding_more_icon").on("click", function (e) {
      if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
      else t = $(this).parent();
      t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
    }), $(document).on("click", function (e) {
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
