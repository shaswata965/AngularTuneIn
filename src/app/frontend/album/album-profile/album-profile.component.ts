import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../service/album.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album-profile',
  templateUrl: './album-profile.component.html',
  styleUrls: ['./album-profile.component.css']
})
export class AlbumProfileComponent implements OnInit {

  public albumId: any;
  public album: any;
  public release: any;

  constructor( public albumService: AlbumService,
               public router: ActivatedRoute) { }

  ngOnInit() {

    this.router.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('albumId')){
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
          let dateArray = this.album.release.split('-');
          this.release = dateArray[2]+' - '+dateArray[1]+' - '+dateArray[0];
        });
      }
    });

  }

}
