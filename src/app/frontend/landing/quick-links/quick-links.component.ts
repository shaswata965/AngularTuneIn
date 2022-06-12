import { Component, OnInit } from '@angular/core';
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {LanguageService} from "../../service/language.service";
import {Language} from "../../models/language.model";
import {AlbumService} from "../../service/album.service";
import {Album} from "../../models/album.model";
import {SongService} from "../../service/song.service";
import {Song} from "../../models/song.model";
import {ArtistService} from "../../service/artist.service";
import {Artist} from "../../models/artist.model";

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.css']
})
export class QuickLinksComponent implements OnInit {

  public ads: any;
  public middleAd: Ad[] = [];

  public languages: any;
  public quickAlbums: any;
  public quickSongs: any;
  public artists: any;

  constructor( public adService: AdService,
               public languageService: LanguageService,
               public albumService: AlbumService,
               private songsService: SongService,
               public artistService: ArtistService) { }

  ngOnInit(){

    this.adService.getAd(1000,1);
    this.adService.getAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      let middleArray = [];
      for(let i =0; i<this.ads.length; i++){
       if(this.ads[i].position === "middle"){
          middleArray.push(this.ads[4]);
          this.middleAd = middleArray;
        }
      }
    });

    this.languageService.getQuickLanguages(5,1);
    this.languageService.getQuickLanguagesUpdateListener().subscribe((languageData:{languages: Language[], languageCount: number})=>{
      this.languages = languageData.languages;
    });

    this.albumService.getQuickAlbums(5,1);
    this.albumService.getQuickAlbumsUpdateListener().subscribe((albumData:{albums: Album[], albumCount: number})=>{
      this.quickAlbums = albumData.albums;
    });

    this.songsService.getQuickSongs(5,1);
    this.songsService.getQuickSongsUpdateListener().subscribe((songData:{songs: Song[], songCount: number})=>{
      this.quickSongs = songData.songs;
    });

    this.artistService.getArtist(5,1);
    this.artistService.getArtistsUpdateListener().subscribe((artistData:{artists: Artist[], artistCount: number})=>{
      this.artists = artistData.artists;
    });
  }

}
