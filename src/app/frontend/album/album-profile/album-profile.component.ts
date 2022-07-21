import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../service/album.service";
import {ActivatedRoute} from "@angular/router";
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-album-profile',
  templateUrl: './album-profile.component.html',
  styleUrls: ['./album-profile.component.css']
})
export class AlbumProfileComponent implements OnInit {

  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;

  public albumId: any;
  public album: any;
  public release: any;
  public ads: any;
  public leftAd: any;
  public rightAd: any;
  public middleAd: any;
  public currentRoute: string;

  constructor( public albumService: AlbumService,
               public router: ActivatedRoute,
               public toastr: ToastrService,
               public adService: AdService,
               public userService: UserService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });

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

    this.adService.getPageAd("album-profile",1000,1);
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

  Copy( album: string){
    this.currentRoute =window.location.protocol+"//"+ window.location.host + "/singles" + "/"+ album;
    this.toastr.success('Share Link Copied Successfully','Success',{closeButton: true})
  }

}
