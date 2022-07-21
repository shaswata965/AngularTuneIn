import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import {PageEvent} from "@angular/material/paginator";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../models/artist.model";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-artist-albums',
  templateUrl: './all-artist-albums.component.html',
  styleUrls: ['./all-artist-albums.component.css']
})
export class AllArtistAlbumsComponent implements OnInit {

  userIsAuthenticated = false;

  // @ts-ignore
  private authListenerSubs: Subscription;

  public albums: any;
  public allArtists: any;
  public firstArtist: any;
  public albumArtist: any;
  public ads: any;
  public leftAd: any;
  public rightAd: any;
  public middleAd: any;
  public currentRoute: string;

  totalSongs= 0;

  constructor(public albumService: AlbumService,
              public artistService: ArtistService,
              public adService: AdService,
              public router: Router,
              public userService: UserService,
              public toastr: ToastrService) { }

  ngOnInit(){

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

    this.albumService.getAlbums(12,1);
    this.albumService.getAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.albums = albumData.albums;
      this.totalSongs = albumData.albumCount;
    });

    this.artistService.getArtist(1000,1);
    this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount: number})=>{
      this.allArtists = artistData.artists;
    });

    this.adService.getPageAd("artist-album",1000,1);
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
    this.albumService.getAlbums(pageEvent.pageSize, pageEvent.pageIndex+1);
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
