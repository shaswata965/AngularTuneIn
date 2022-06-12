import { Component, OnInit } from '@angular/core';
import {Song} from "../../models/song.model";
import * as $ from "jquery";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../service/artist.service";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {

  public artistId: any;
  public artist: any;
  public albums: any;

  totalAlbums =0;

  constructor(public route: ActivatedRoute,
              public artistService: ArtistService,
              public albumService: AlbumService) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap)=>{
      this.artistId = paramMap.get('artistId');
      console.log(this.artistId);
      this.artistService.getEditArtist(this.artistId).subscribe(artistData=>{
        this.artist = {id:artistData._id, name:artistData.name, imagePath: artistData.imagePath}
      });
      this.albumService.getAlbumArtist(this.artistId, 8,1);
      this.albumService.getAlbumArtistUpdateListener().subscribe((albumData:{albums:Album[], albumCount:number})=>{
        this.albums = albumData.albums;
        this.totalAlbums = albumData.albumCount;
        console.log(this.totalAlbums);
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
    this.albumService.getAlbumArtist(this.artistId, pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
