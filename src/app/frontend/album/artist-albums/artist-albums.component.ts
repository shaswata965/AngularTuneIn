import { Component, OnInit } from '@angular/core';
import {Song} from "../../models/song.model";
import * as $ from "jquery";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../service/artist.service";
import {SongService} from "../../service/song.service";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {

  public artistId: any;
  public artist: any;
  public songs: Song[]= [];
  public ads: any;
  public leftAd: any;
  public rightAd: any;

  totalSongs =0;

  constructor(public route: ActivatedRoute,
              public artistService: ArtistService,
              public songService: SongService,
              public adService: AdService) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap)=>{
      this.artistId = paramMap.get('artistId');
      this.artistService.getEditArtist(this.artistId).subscribe(artistData=>{
        this.artist = {id:artistData._id, name:artistData.name, imagePath: artistData.imagePath}
        this.songService.getSongArtist(this.artist.name, 8,1);
        this.songService.getSongArtistUpdateListener().subscribe((songData:{songs:Song[], songCount:number})=>{
          this.songs = songData.songs;
          this.totalSongs = songData.songCount;
        });
      });
    });

    this.adService.getPageAd("artist-song",1000,1);
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

  OpenTrending(){

    $(".m24_tranding_more_icon").on("click", function(e) {
      if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
      else t = $(this).parent();
      t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
    }), $(document).on("click", function(e) {
      $("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option")
    })

  }

  onChangedPage(pageEvent: PageEvent, name: string){
    this.songService.getSongArtist(name, pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
