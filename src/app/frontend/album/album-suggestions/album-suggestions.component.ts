import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import * as $ from "jquery";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-album-suggestions',
  templateUrl: './album-suggestions.component.html',
  styleUrls: ['./album-suggestions.component.css']
})
export class AlbumSuggestionsComponent implements OnInit {

  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  public albumId: any;
  public album: any;
  public albumGenre: any;
  public albums: any;
  public recentAlbums: any;
  public ads: any;
  public middleAd: any;
  public currentRoute: string;

  constructor(public route: ActivatedRoute,
              public albumService: AlbumService,
              public adService: AdService,
              public toastr: ToastrService,
              public userService: UserService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.route.paramMap.subscribe((paramMap)=>{

      this.albumId = paramMap.get('albumId');

      this.albumService.getEditAlbum(this.albumId).subscribe(albumData=> {
        this.album = {
          id: albumData._id,
          name: albumData.name,
          description: albumData.description,
          cast: albumData.cast,
          release: albumData.release,
          year: albumData.year,
          language: albumData.language,
          artist: albumData.artist,
          genre: albumData.genre,
          industry: albumData.industry,
          castLink: albumData.castLink,
          imagePath: albumData.imagePath
        };

        this.albumGenre = this.album.genre;

        this.albumService.getAlbumGenre(this.album.genre, 4,1);
        this.albumService.getAlbumGenreUpdateListener().subscribe((albumData:{album:Album[], albumCount: number})=>{
          let albumsArray = []
          for(let i= 0; i < albumData.album.length; ++i){
            if(this.album.name !== albumData.album[i].name){
              albumsArray.push(albumData.album[i]);
              this.albums = albumsArray;
            }
          }
        });

      });

      this.albumService.getAlbums(4,1);
      this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
        this.recentAlbums = albumData.albums;
      });

    });

    this.adService.getPageAd("album-suggestion",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
         if(this.ads[i].position === "middle"){
          this.middleAd = this.ads[i];
        }
      }
    });

  }

  Copy( album: string){
    this.currentRoute =window.location.protocol+"//"+ window.location.host + "/singles" + "/"+ album;
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
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

}
