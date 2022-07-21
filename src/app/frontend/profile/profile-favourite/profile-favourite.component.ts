import { Component, OnInit } from '@angular/core';
import {Ad} from "../../models/ad.model";
import {AdService} from "../../service/ad.service";

@Component({
  selector: 'app-profile-favourite',
  templateUrl: './profile-favourite.component.html',
  styleUrls: ['./profile-favourite.component.css']
})
export class ProfileFavouriteComponent implements OnInit {

  public ads:any;
  public middleAd: any

  constructor(public adService: AdService) { }

  ngOnInit() {
    this.adService.getPageAd("profile",1000,1);
    this.adService.getPageAdsUpdateListener().subscribe((adData:{ads:Ad[],adCount:number})=>{
      this.ads = adData.ads;
      for(let i =0; i<this.ads.length; i++){
        if(this.ads[i].position === "middle"){
          this.middleAd =this.ads[i];
        }
      }
    });
  }

}
