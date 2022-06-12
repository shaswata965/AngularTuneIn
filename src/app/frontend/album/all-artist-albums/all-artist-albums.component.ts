import { Component, OnInit } from '@angular/core';
import {Song} from "../../models/song.model";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import {PageEvent} from "@angular/material/paginator";
import {Language} from "../../models/language.model";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../models/artist.model";

@Component({
  selector: 'app-all-artist-albums',
  templateUrl: './all-artist-albums.component.html',
  styleUrls: ['./all-artist-albums.component.css']
})
export class AllArtistAlbumsComponent implements OnInit {

  public albums: any;
  public allArtists: any;
  public firstArtist: any;
  public albumArtist: any;

  totalSongs= 0;

  constructor(public albumService: AlbumService,
              public artistService: ArtistService) { }

  ngOnInit(){

    this.albumService.getAlbums(12,1);
    this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.albums = albumData.albums;
      this.totalSongs = albumData.albumCount;
    });

    this.artistService.getArtist(1000,1);
    this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount: number})=>{
      this.allArtists = artistData.artists;
    });

  }

  onChangedPage(pageEvent: PageEvent){
    this.albumService.getAlbums(pageEvent.pageSize, pageEvent.pageIndex+1);
  }

}
