import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../service/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../service/song.service";
import {Song} from "../../models/song.model";
import {PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";

@Component({
  selector: 'app-album-songs',
  templateUrl: './album-songs.component.html',
  styleUrls: ['./album-songs.component.css']
})
export class AlbumSongsComponent implements OnInit {

  public urls: String[] =[];

  public albumId: any;
  public album: any;
  public songs: any;
  public currentRoute: string;
  public ads: any;
  public middleAds: any;

  totalSongs= 0;

  constructor( public albumService: AlbumService,
               public router: ActivatedRoute,
               public songService: SongService,
               public route: Router,
               public toastr: ToastrService,
               public adService: AdService) { }


  ngOnInit() {

    this.currentRoute =window.location.protocol+"//"+ window.location.host + this.route.url.toString();
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
        });

        this.songService.getAlbumSong(this.albumId, 5,1);
        this.songService.getAlbumSongUpdateListener().subscribe((songData:{songs: Song[], songCount: number})=>{
          this.songs = songData.songs;
          this.totalSongs = songData.songCount;
        });

      }
    });

    this.adService.getPageAd("album-song",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "middle"){
          this.middleAds = this.ads[i];
        }
      }
    });

  }

  onChangedPage(pageEvent: PageEvent){
    this.songService.getAlbumSong(this.albumId,pageEvent.pageSize, pageEvent.pageIndex+1);
  }

  downloadAsZip(albumId:any): void {
    this.albumService.getLowSongURLs(albumId);
    this.albumService.getAlbumsLowURLUpdateListener().subscribe((albumURL:any)=>{
      let binary = '';
      const bytes = new Uint8Array(albumURL.data);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const file = window.btoa(binary);
      const Filetype = 'mp3'
      const mimType = Filetype === 'mp3' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
        Filetype === 'pptx' ? 'application/pptx' : Filetype === 'pdf' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
          Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
      const url = `data:${mimType};base64,` + file;

      // download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = this.album.name + '.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });

  }

  downloadSongs(path:string, res: string){
    let x = path.split('/');
    let y = x[4];
    let p = x[4].split('-');
    let name = p[0] + '_'+p[1] + '_' + p[2];
    console.log(p);
    this.songService.downloadSong(y);
    this.songService.downloadSongUpdate().subscribe((dataBuffer: any)=>{
      console.log(dataBuffer);
      let binary = '';
      const bytes = new Uint8Array(dataBuffer.data);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const file = window.btoa(binary);
      const Filetype = 'mp3'
      const mimType = Filetype === 'mp3' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
        Filetype === 'pptx' ? 'application/pptx' : Filetype === 'pdf' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
          Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
      const url = `data:${mimType};base64,` + file;

      // download the file
      const a = document.createElement('a');
      a.href = url;
      if(res==='Low'){
        a.download = name+'_128Kbps'+ '.mp3';
      }else{
        a.download = name+'_320Kbps'+ '.mp3';
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  Copied(){
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
  }

}
