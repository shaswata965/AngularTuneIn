import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import * as $ from "jquery";

@Component({
  selector: 'app-album-suggestions',
  templateUrl: './album-suggestions.component.html',
  styleUrls: ['./album-suggestions.component.css']
})
export class AlbumSuggestionsComponent implements OnInit {

  public albumId: any;
  public album: any;
  public albumGenre: any;
  public albums: any;
  public recentAlbums: any;

  constructor(public route: ActivatedRoute,
              public albumService: AlbumService) { }

  ngOnInit() {

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
          this.albums = albumData.album;
        });

      });

      this.albumService.getAlbums(4,1);
      this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
        this.recentAlbums = albumData.albums;
      });

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

}
